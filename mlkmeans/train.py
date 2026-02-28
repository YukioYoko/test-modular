import pandas as pd
from sqlalchemy import create_engine
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import joblib
import os

# Configura tu URL de Neon
DATABASE_URL = "postgresql://neondb_owner:npg_Qqc7DRHTp6lS@ep-withered-river-ahnhmx9o-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require" 

def entrenar_modelo():
    try:
        engine = create_engine(DATABASE_URL)
        df = pd.read_sql("SELECT * FROM vista_entrenamiento_menus", engine)
        
        if df.empty:
            print("❌ La vista está vacía. Verifica la carga de datos.")
            return

        # Características base
        features = ['hora', 'dia_semana', 'es_festivo', 'clima_id']
        X = df[features]
        
        # 1. Escalado estándar
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)
        
        # 2. Aplicar Pesos (Feature Weighting)
        # Convertimos a DataFrame para multiplicar columnas específicas
        X_weighted = pd.DataFrame(X_scaled, columns=features)
        
        # Aumentamos la importancia para que el modelo reaccione más a estos cambios:
        X_weighted['clima_id'] *= 4.0   # El clima es ahora la prioridad máxima
        X_weighted['hora'] *= 2.5       # La hora tiene un peso fuerte para desayuno/comida/cena
        X_weighted['es_festivo'] *= 1.5 # Los días festivos pesan más que un día normal
        X_weighted['dia_semana'] *= 0.5 # Reducimos el peso del día para que no opaque al clima

        # 3. Entrenar con 6 clústeres para mayor diversidad
        kmeans = KMeans(n_clusters=6, random_state=42, n_init=10)
        df['cluster'] = kmeans.fit_predict(X_weighted)
        
        templates = {}
        categorias = ['cat_entrada', 'cat_ensalada', 'cat_pasta', 'cat_fuerte', 'cat_bebida', 'cat_postre']

        for i in range(6):
            cluster_data = df[df['cluster'] == i]
            templates[i] = {}
            for cat in categorias:
                # Filtramos para ignorar ceros y obtener el ID de producto real
                valid_ids = cluster_data[cluster_data[cat] > 0][cat]
                if not valid_ids.empty:
                    # Usamos la moda del clúster
                    templates[i][cat] = int(valid_ids.mode()[0])
                else:
                    # Fallback global si el clúster está vacío en esa categoría
                    templates[i][cat] = int(df[df[cat] > 0][cat].mode()[0])

        # Guardamos en la carpeta 'ml'
        if not os.path.exists('ml'): os.makedirs('ml')
        
        # Guardamos el scaler y el modelo entrenado con pesos
        joblib.dump({
            "model": kmeans, 
            "scaler": scaler, 
            "templates": templates,
            "weights": {"clima_id": 4.0, "hora": 2.5, "es_festivo": 1.5, "dia_semana": 0.5}
        }, 'ml/modelo_kmeans.pkl')
        
        print("✅ Modelo K-Means con pesos actualizado exitosamente.")

    except Exception as e:
        print(f"❌ Error durante el entrenamiento: {e}")

if __name__ == "__main__":
    entrenar_modelo()