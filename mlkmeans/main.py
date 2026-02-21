from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import datetime
import os
import numpy as np
import pandas as pd
import requests
import holidays

app = FastAPI(title="Foodlify AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cargar el artefacto de K-Means
MODEL_PATH = os.path.join("ml", "modelo_kmeans.pkl")
try:
    data_ml = joblib.load(MODEL_PATH)
    kmeans = data_ml["model"]
    scaler = data_ml["scaler"]
    templates = data_ml["templates"]
    # Cargamos los pesos definidos en el entrenamiento
    weights = data_ml.get("weights", {"clima_id": 4.0, "hora": 2.5, "es_festivo": 1.5, "dia_semana": 0.5})
    print("✅ Modelo K-Means con Pesos cargado correctamente.")
except Exception as e:
    print(f"⚠️ Error al cargar modelo: {e}")

def get_contexto():
    API_KEY = "18b8ae5f959c416da2940445241211"
    try:
        url = f"http://api.weatherapi.com/v1/current.json?key={API_KEY}&q=Guadalajara"
        res = requests.get(url).json()
        cond = res['current']['condition']['text'].lower()
        clima_id = 2 if "rain" in cond else (1 if "cloud" in cond else 0)
        festivo = 1 if datetime.date.today() in holidays.CountryHoliday('MX') else 0
        return festivo, clima_id
    except:
        return 0, 0

@app.get("/recomendar-menu")
def recomendar_menu(test_hour: int = None, test_clima: int = None, test_dia: int = None):
    ahora = datetime.datetime.now()
    festivo, clima_real = get_contexto()
    
    hora_f = test_hour if test_hour is not None else ahora.hour
    clima_f = test_clima if test_clima is not None else clima_real
    dia_f = test_dia if test_dia is not None else ahora.weekday()

    # 1. Crear DataFrame con nombres de columnas para evitar UserWarning
    features = ['hora', 'dia_semana', 'es_festivo', 'clima_id']
    input_df = pd.DataFrame([[hora_f, dia_f, festivo, clima_f]], columns=features)
    
    # 2. Escalar datos
    input_scaled = scaler.transform(input_df)
    input_scaled_df = pd.DataFrame(input_scaled, columns=features)
    
    # 3. Aplicar los mismos pesos del entrenamiento para que la predicción sea exacta
    input_scaled_df['clima_id'] *= weights['clima_id']
    input_scaled_df['hora'] *= weights['hora']
    input_scaled_df['es_festivo'] *= weights['es_festivo']
    input_scaled_df['dia_semana'] *= weights['dia_semana']
    
    # 4. Identificar el clúster
    cluster_pred = kmeans.predict(input_scaled_df)[0]
    
    # Convertir a int de Python para evitar el KeyError con np.int32
    cluster_actual = int(cluster_pred)
    
    # 5. Construir 3 menús variados usando los 6 clústeres disponibles
    menus = []
    # Seleccionamos el clúster predicho y los dos siguientes (circularmente)
    orden_clusters = [cluster_actual, (cluster_actual + 1) % 6, (cluster_actual + 2) % 6]
    titulos = ["Sugerencia por Clima", "Opción Popular", "Especial de la Casa"]
    
    for idx, c_id in enumerate(orden_clusters):
        # Acceso seguro al template usando el ID convertido a int
        t = templates.get(c_id, templates[0]) 
        menus.append({
            "nombre": titulos[idx],
            "items": {
                "entrada_cat": t["cat_entrada"],
                "ensalada_cat": t["cat_ensalada"],
                "pasta_cat": t["cat_pasta"],
                "plato_fuerte_cat": t["cat_fuerte"],
                "bebida_cat": t["cat_bebida"],
                "postre_cat": t["cat_postre"]
            }
        })

    return {
        "success": True, 
        "contexto_aplicado": {"hora": hora_f, "clima": clima_f, "cluster": cluster_actual},
        "menus": menus
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)