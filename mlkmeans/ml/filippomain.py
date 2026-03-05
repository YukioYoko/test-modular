from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import joblib
import datetime
import os
import random
import numpy as np
import pandas as pd
import requests
import holidays

app = FastAPI(
    title="Foodlify AI - Recomendación Contextual",
    version="2.0",
    description="Sistema de recomendación de platillos basado en K-Means contextual"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─────────────────────────────────────────────
# CONFIGURACIÓN
# ─────────────────────────────────────────────
MODEL_PATH = os.path.join("ml", "modelo_kmeans.pkl")
WEATHER_API_KEY = "18b8ae5f959c416da2940445241211"

CATEGORIAS = {
    1: "ENTRADAS",
    2: "PASTAS",
    3: "PLATILLOS",
    4: "POSTRES",
    5: "BEBIDAS",
    6: "ENSALADAS",
}

CAT_KEY_MAP = {
    1: "cat_entrada",
    2: "cat_pasta",
    3: "cat_fuerte",
    4: "cat_postre",
    5: "cat_bebida",
    6: "cat_ensalada",
}

TOP_N_POR_CATEGORIA = 3

# ─────────────────────────────────────────────
# CARGA DEL MODELO
# ─────────────────────────────────────────────
kmeans = None
scaler = None
weights = None
feature_names = None
distribuciones = None
popularidad_global = None
n_clusters = 0

try:
    data_ml = joblib.load(MODEL_PATH)
    version = data_ml.get("version", "1.0")

    if version == "2.0":
        kmeans = data_ml["model"]
        scaler = data_ml["scaler"]
        weights = data_ml["weights"]
        feature_names = data_ml["feature_names"]
        distribuciones = data_ml["distribuciones"]
        popularidad_global = data_ml["popularidad_global"]
        n_clusters = data_ml["n_clusters"]
        print(f"✅ Modelo v{version} cargado: {n_clusters} clusters, features={feature_names}")
    else:
        print(f"⚠️ Modelo v{version} detectado (versión anterior). Ejecuta train.py para actualizar.")
except Exception as e:
    print(f"⚠️ Error al cargar modelo: {e}")


# ─────────────────────────────────────────────
# FUNCIONES AUXILIARES
# ─────────────────────────────────────────────
def get_clima() -> int:
    try:
        url = f"http://api.weatherapi.com/v1/current.json?key={WEATHER_API_KEY}&q=Guadalajara"
        res = requests.get(url, timeout=5).json()
        cond = res["current"]["condition"]["text"].lower()
        if "rain" in cond or "thunder" in cond or "drizzle" in cond:
            return 2
        elif "cloud" in cond or "overcast" in cond:
            return 1
        else:
            return 0
    except Exception:
        return 0


def get_es_festivo() -> int:
    return 1 if datetime.date.today() in holidays.CountryHoliday("MX") else 0


def construir_features(hora: int, dia_semana: int, es_festivo: int, clima_id: int) -> pd.DataFrame:
    """Construye el vector de features (misma lógica que train.py)."""
    if hora <= 6:
        franja = 0
    elif hora <= 12:
        franja = 1
    elif hora <= 17:
        franja = 2
    else:
        franja = 3

    es_finsemana = 1 if dia_semana >= 5 else 0

    input_data = pd.DataFrame(
        [[hora, dia_semana, es_festivo, clima_id, franja, es_finsemana]],
        columns=feature_names
    )

    input_scaled = pd.DataFrame(
        scaler.transform(input_data),
        columns=feature_names
    )

    for col in feature_names:
        input_scaled[col] *= weights[col]

    return input_scaled


def obtener_recomendaciones(cluster_id: int, top_n: int = TOP_N_POR_CATEGORIA) -> dict:
    """Top N productos por categoría con fallback a popularidad global."""
    recomendaciones = {}
    cluster_dist = distribuciones.get(cluster_id, {})

    for cat_id, cat_nombre in CATEGORIAS.items():
        prod_probs = cluster_dist.get(cat_id, {})
        if not prod_probs:
            prod_probs = popularidad_global.get(cat_id, {})
        if not prod_probs:
            continue

        sorted_prods = sorted(prod_probs.items(), key=lambda x: -x[1])
        top_productos = [
            {"id_producto": int(prod_id), "score": round(prob * 100, 1)}
            for prod_id, prob in sorted_prods[:top_n]
        ]

        recomendaciones[cat_id] = {
            "categoria": cat_nombre,
            "key": CAT_KEY_MAP.get(cat_id, f"cat_{cat_id}"),
            "productos": top_productos,
            "fuente": "cluster" if cat_id in cluster_dist else "global",
        }

    return recomendaciones


def obtener_menu_variado(cluster_id: int) -> dict:
    """Menú con muestreo ponderado para variedad."""
    menu = {}
    cluster_dist = distribuciones.get(cluster_id, {})

    for cat_id, cat_nombre in CATEGORIAS.items():
        prod_probs = cluster_dist.get(cat_id, {})
        if not prod_probs:
            prod_probs = popularidad_global.get(cat_id, {})
        if not prod_probs:
            continue

        productos = list(prod_probs.keys())
        probabilidades = list(prod_probs.values())

        n_seleccionar = min(2, len(productos))
        seleccionados = random.choices(productos, weights=probabilidades, k=n_seleccionar)
        seleccionados = list(dict.fromkeys(seleccionados))

        menu[cat_id] = {
            "categoria": cat_nombre,
            "key": CAT_KEY_MAP.get(cat_id, f"cat_{cat_id}"),
            "productos": [
                {"id_producto": int(p), "score": round(prod_probs[p] * 100, 1)}
                for p in seleccionados
            ],
        }

    return menu


# ─────────────────────────────────────────────
# ENDPOINTS
# ─────────────────────────────────────────────

@app.get("/recomendar-menu")
def recomendar_menu(
    test_hour: int = Query(None, description="Hora para testing (0-23)"),
    test_clima: int = Query(None, description="Clima para testing (0=sol, 1=nublado, 2=lluvia)"),
    test_dia: int = Query(None, description="Día para testing (0=Lun, 6=Dom)"),
    top_n: int = Query(TOP_N_POR_CATEGORIA, description="Productos por categoría"),
):
    if kmeans is None:
        return {"success": False, "error": "Modelo no disponible. Ejecuta train.py primero."}

    ahora = datetime.datetime.now()
    hora = test_hour if test_hour is not None else ahora.hour
    clima = test_clima if test_clima is not None else get_clima()
    dia = test_dia if test_dia is not None else ahora.weekday()
    festivo = get_es_festivo()

    input_features = construir_features(hora, dia, festivo, clima)
    cluster_id = int(kmeans.predict(input_features)[0])

    recomendaciones = obtener_recomendaciones(cluster_id, top_n)
    menu_variado = obtener_menu_variado(cluster_id)

    return {
        "success": True,
        "contexto": {
            "hora": hora,
            "dia_semana": dia,
            "clima_id": clima,
            "es_festivo": festivo,
            "cluster": cluster_id,
        },
        "recomendaciones": recomendaciones,
        "menu_variado": menu_variado,
    }


@app.get("/clusters/info")
def clusters_info():
    if kmeans is None:
        return {"success": False, "error": "Modelo no disponible"}

    info = {}
    for c_id, cat_dist in distribuciones.items():
        info[c_id] = {}
        for cat_id, prod_dist in cat_dist.items():
            top = sorted(prod_dist.items(), key=lambda x: -x[1])[:3]
            info[c_id][CATEGORIAS.get(cat_id, f"Cat{cat_id}")] = [
                {"id_producto": p, "probabilidad": f"{prob*100:.1f}%"}
                for p, prob in top
            ]

    return {
        "success": True,
        "n_clusters": n_clusters,
        "features": feature_names,
        "weights": weights,
        "clusters": info,
    }


@app.get("/health")
def health():
    return {
        "status": "ok" if kmeans is not None else "modelo_no_cargado",
        "version": "2.0",
        "n_clusters": n_clusters if kmeans else 0,
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)