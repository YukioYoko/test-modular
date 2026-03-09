"""
train.py — Entrenamiento del Sistema de Recomendación Contextual
================================================================
Conecta a Neon PostgreSQL, lee la vista_entrenamiento_menus,
entrena K-Means con features contextuales ponderadas, y genera
distribuciones de probabilidad por cluster (en vez de templates fijos).

Uso:
    python train.py
"""

import pandas as pd
import numpy as np
from sqlalchemy import create_engine
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score
import joblib
import os

# ─────────────────────────────────────────────
# CONFIGURACIÓN
# ─────────────────────────────────────────────
DATABASE_URL = "postgresql://neondb_owner:npg_Qqc7DRHTp6lS@ep-withered-river-ahnhmx9o-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"

# Mapeo de columnas de la vista a categorías
CAT_COLUMNS = {
    "cat_entrada": 1,    # ENTRADAS
    "cat_pasta": 2,      # PASTAS
    "cat_fuerte": 3,     # PLATILLOS
    "cat_postre": 4,     # POSTRES
    "cat_bebida": 5,     # BEBIDAS
    "cat_ensalada": 6,   # ENSALADAS
}

# Pesos para las features contextuales
WEIGHTS = {
    "hora": 3.0,
    "dia_semana": 2.5,    # 🔥 Aumentado de 0.5 para dar relevancia al día específico
    "es_festivo": 2.0,    # 🔥 Aumentado de 1.0 para captar días especiales
    "clima_id": 3.0,      # ⚖️ Reducido de 5.0 para que no opaque a los demás
    "franja": 2.5,
    "es_finsemana": 2.5,
}

OUTPUT_PATH = os.path.join("ml", "modelo_kmeans.pkl")


# ─────────────────────────────────────────────
# 1. CARGA Y TRANSFORMACIÓN DE DATOS
# ─────────────────────────────────────────────
def cargar_datos() -> pd.DataFrame:
    """
    Lee la vista_entrenamiento_menus y la transforma a formato largo:
    cada fila = (hora, dia_semana, es_festivo, clima_id, id_producto, id_categoria)
    """
    print("📡 Conectando a Neon PostgreSQL...")
    engine = create_engine(DATABASE_URL)
    df_raw = pd.read_sql("SELECT * FROM vista_entrenamiento_menus", engine)
    engine.dispose()

    if df_raw.empty:
        raise ValueError("❌ La vista está vacía. Verifica la carga de datos.")

    print(f"   Filas obtenidas de la vista: {len(df_raw)}")

    # Transformar de formato ancho (cat_entrada, cat_pasta, ...) a formato largo
    # Cada fila tiene el id_producto en UNA columna cat_*, y 0 en las demás
    rows = []
    for _, row in df_raw.iterrows():
        contexto = {
            "hora": int(row["hora"]),
            "dia_semana": int(row["dia_semana"]),
            "es_festivo": 1 if row["es_festivo"] in [True, 1, "true", "True"] else 0,
            "clima_id": int(row["clima_id"]),
        }

        for col, cat_id in CAT_COLUMNS.items():
            prod_id = int(row.get(col, 0))
            if prod_id > 0:
                rows.append({
                    **contexto,
                    "id_producto": prod_id,
                    "id_categoria": cat_id,
                })

    df = pd.DataFrame(rows)
    print(f"✅ Datos transformados: {len(df)} registros producto-contexto")
    print(f"   Productos únicos: {df['id_producto'].nunique()}")
    print(f"   Categorías: {sorted(df['id_categoria'].unique())}")
    print(f"   Climas: {dict(df['clima_id'].value_counts().sort_index())}")
    return df


# ─────────────────────────────────────────────
# 2. FEATURE ENGINEERING
# ─────────────────────────────────────────────
def preparar_features(df: pd.DataFrame) -> pd.DataFrame:
    """Crea features adicionales para mejorar el clustering."""
    features = df[["hora", "dia_semana", "es_festivo", "clima_id"]].copy()

    # Franja horaria: 0=madrugada, 1=mañana, 2=tarde, 3=noche
    features["franja"] = pd.cut(
        features["hora"],
        bins=[-1, 6, 12, 17, 23],
        labels=[0, 1, 2, 3]
    ).astype(int)

    # Fin de semana
    features["es_finsemana"] = (features["dia_semana"] >= 5).astype(int)

    return features


def escalar_y_ponderar(features: pd.DataFrame) -> tuple:
    """Escala y aplica pesos a las features."""
    feature_names = list(features.columns)

    scaler = StandardScaler()
    scaled = pd.DataFrame(
        scaler.fit_transform(features),
        columns=feature_names
    )

    for col in feature_names:
        scaled[col] *= WEIGHTS[col]

    return scaled, scaler, feature_names


# ─────────────────────────────────────────────
# 3. ENCONTRAR K ÓPTIMO
# ─────────────────────────────────────────────
def encontrar_k_optimo(X: pd.DataFrame, k_range=range(4, 13)) -> int:
    """Usa Silhouette Score para encontrar el K óptimo."""
    scores = {}
    print("\n🔍 Buscando K óptimo...")

    for k in k_range:
        km = KMeans(n_clusters=k, n_init=10, random_state=42, max_iter=300)
        labels = km.fit_predict(X)
        score = silhouette_score(X, labels)
        scores[k] = score
        print(f"   K={k}: silhouette={score:.4f}")

    best_k = max(scores, key=scores.get)
    print(f"\n   ✅ K óptimo: {best_k} (silhouette={scores[best_k]:.4f})")
    return best_k


# ─────────────────────────────────────────────
# 4. ENTRENAMIENTO Y DISTRIBUCIONES
# ─────────────────────────────────────────────
def entrenar_kmeans(X: pd.DataFrame, k: int) -> KMeans:
    """Entrena K-Means."""
    kmeans = KMeans(n_clusters=k, n_init=10, random_state=42, max_iter=300)
    kmeans.fit(X)
    print(f"\n🧠 Modelo entrenado con K={k}")
    print(f"   Inertia: {kmeans.inertia_:.2f}")
    return kmeans


def calcular_distribuciones(df: pd.DataFrame, labels: np.ndarray) -> dict:
    """
    Para cada cluster, calcula la distribución de probabilidad
    de productos POR CATEGORÍA.

    Resultado:
    {
        cluster_id: {
            categoria_id: { producto_id: probabilidad, ... },
            ...
        }
    }
    """
    df_c = df.copy()
    df_c["cluster"] = labels

    distribuciones = {}
    for cluster_id in sorted(df_c["cluster"].unique()):
        cluster_data = df_c[df_c["cluster"] == cluster_id]
        distribuciones[int(cluster_id)] = {}

        for cat_id in sorted(cluster_data["id_categoria"].unique()):
            cat_data = cluster_data[cluster_data["id_categoria"] == cat_id]
            freq = cat_data["id_producto"].value_counts(normalize=True)
            distribuciones[int(cluster_id)][int(cat_id)] = {
                int(prod): round(float(prob), 4)
                for prod, prob in freq.items()
            }

    return distribuciones


def calcular_popularidad_global(df: pd.DataFrame) -> dict:
    """Popularidad global por categoría (fallback)."""
    global_dist = {}
    for cat_id in sorted(df["id_categoria"].unique()):
        cat_data = df[df["id_categoria"] == cat_id]
        freq = cat_data["id_producto"].value_counts(normalize=True)
        global_dist[int(cat_id)] = {
            int(prod): round(float(prob), 4)
            for prod, prob in freq.items()
        }
    return global_dist


# ─────────────────────────────────────────────
# 5. RESUMEN Y GUARDADO
# ─────────────────────────────────────────────
CATEGORIAS_NOMBRE = {
    1: "ENTRADAS", 2: "PASTAS", 3: "PLATILLOS",
    4: "POSTRES", 5: "BEBIDAS", 6: "ENSALADAS"
}


def describir_clusters(df: pd.DataFrame, labels: np.ndarray, distribuciones: dict):
    """Imprime resumen de cada cluster."""
    df_temp = df.copy()
    df_temp["cluster"] = labels
    CLIMAS = {0: "Soleado", 1: "Nublado", 2: "Lluvia"}

    print("\n" + "=" * 60)
    print("📊 DESCRIPCIÓN DE CLUSTERS")
    print("=" * 60)

    for c_id in sorted(df_temp["cluster"].unique()):
        c_data = df_temp[df_temp["cluster"] == c_id]
        print(f"\n--- Cluster {c_id} ({len(c_data)} registros) ---")
        print(f"  Hora promedio: {c_data['hora'].mean():.1f}")
        print(f"  Clima más común: {CLIMAS.get(int(c_data['clima_id'].mode().iloc[0]), '?')}")
        print(f"  Día más común: {int(c_data['dia_semana'].mode().iloc[0])}")

        if c_id in distribuciones:
            for cat_id, prods in distribuciones[c_id].items():
                top = sorted(prods.items(), key=lambda x: -x[1])[:2]
                cat_name = CATEGORIAS_NOMBRE.get(cat_id, f"Cat{cat_id}")
                top_str = ", ".join([f"P{p}({prob*100:.0f}%)" for p, prob in top])
                print(f"  {cat_name}: {top_str}")


def guardar_modelo(kmeans, scaler, weights, feature_names,
                   distribuciones, popularidad_global):
    """Guarda el artefacto completo."""
    if not os.path.exists("ml"):
        os.makedirs("ml")

    artefacto = {
        "model": kmeans,
        "scaler": scaler,
        "weights": weights,
        "feature_names": feature_names,
        "distribuciones": distribuciones,
        "popularidad_global": popularidad_global,
        "n_clusters": kmeans.n_clusters,
        "version": "2.0",
    }
    joblib.dump(artefacto, OUTPUT_PATH)
    print(f"\n💾 Modelo guardado en: {OUTPUT_PATH}")


# ─────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────
def entrenar_modelo():
    try:
        # 1. Cargar y transformar
        df = cargar_datos()

        # 2. Preparar features
        features = preparar_features(df)
        X_scaled, scaler, feature_names = escalar_y_ponderar(features)

        # 3. Encontrar K óptimo
        k = encontrar_k_optimo(X_scaled)

        # 4. Entrenar
        kmeans = entrenar_kmeans(X_scaled, k)
        labels = kmeans.labels_

        # 5. Calcular distribuciones
        distribuciones = calcular_distribuciones(df, labels)
        popularidad_global = calcular_popularidad_global(df)

        # 6. Resumen
        describir_clusters(df, labels, distribuciones)

        # 7. Guardar
        guardar_modelo(kmeans, scaler, WEIGHTS, feature_names,
                       distribuciones, popularidad_global)

        print("\n✅ Entrenamiento completado exitosamente.")

    except Exception as e:
        print(f"❌ Error durante el entrenamiento: {e}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    entrenar_modelo()