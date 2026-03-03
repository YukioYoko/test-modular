from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import datetime
import os
import requests
import holidays

app = FastAPI(title="Foodlify AI API")

# Configuración de CORS para permitir peticiones desde Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ruta al modelo generado por tu script de entrenamiento
# Asegúrate de que el archivo exista en la carpeta /ml
MODEL_PATH = os.path.join("ml", "modelo_multimenu.pkl")

try:
    if os.path.exists(MODEL_PATH):
        model = joblib.load(MODEL_PATH)
        print(f"✅ Modelo cargado exitosamente desde {MODEL_PATH}")
    else:
        model = None
        print(f"⚠️ Advertencia: Archivo {MODEL_PATH} no encontrado.")
except Exception as e:
    model = None
    print(f"❌ Error crítico al cargar el modelo: {e}")

def get_contexto_actual(ciudad="Guadalajara"):
    """
    Obtiene el clima actual y verifica si es día festivo en México.
    """
    API_KEY = "18b8ae5f959c416da2940445241211"
    try:
        url = f"http://api.weatherapi.com/v1/current.json?key={API_KEY}&q={ciudad}"
        res = requests.get(url).json()
        condicion = res['current']['condition']['text'].lower()
        
        # Mapeo de clima según tu entrenamiento: 0=Despejado, 1=Nublado, 2=Lluvia
        if "rain" in condicion or "thunder" in condicion or "drizzle" in condicion:
            clima_id = 2
        elif "cloud" in condicion or "overcast" in condicion:
            clima_id = 1
        else:
            clima_id = 0
            
        mx_holidays = holidays.CountryHoliday('MX')
        es_festivo = 1 if datetime.date.today() in mx_holidays else 0
        
        return es_festivo, clima_id
    except Exception as e:
        print(f"⚠️ Error al obtener contexto: {e}")
        return 0, 0

@app.get("/recomendar-menu")
def recomendar_menu(ciudad: str = "Guadalajara"):
    if model is None:
        return {"success": False, "error": "El modelo no está disponible."}

    ahora = datetime.datetime.now()
    festivo, clima = get_contexto_actual(ciudad)
    
    menus = []
    titulos = ["Sugerencia del Chef", "Menú Equilibrado", "Especial del Día"]
    
    # Lista de variaciones para forzar diversidad en los resultados
    # Modificamos ligeramente la hora o el clima para cada opción
    variaciones = [
        (ahora.hour, clima),           # Original
        ((ahora.hour - 2) % 24, 0),     # Simula otra hora y clima despejado
        ((ahora.hour + 2) % 24, 1)      # Simula otra hora y clima nublado
    ]

    try:
        for i in range(3):
            v_hora, v_clima = variaciones[i]
            
            # El modelo predice basándose en la variación actual
            preds = model.predict([[v_hora, ahora.weekday(), festivo, v_clima]])[0]
            
            menus.append({
                "nombre": titulos[i],
                "items": {
                    "entrada_cat": int(preds[0]),
                    "ensalada_cat": int(preds[1]),
                    "pasta_cat": int(preds[2]),
                    "plato_fuerte_cat": int(preds[3]),
                    "bebida_cat": int(preds[4]),
                    "postre_cat": int(preds[5])
                }
            })

        return {
            "success": True, 
            "menus": menus, 
            "clima_info": {
                "clima_id": clima, 
                "es_festivo": bool(festivo)
            }
        }
    except Exception as e:
        return {"success": False, "error": str(e)}

if __name__ == "__main__":
    import uvicorn
    # Forzamos 127.0.0.1 para evitar problemas de resolución de 'localhost' en Windows
    uvicorn.run(app, host="127.0.0.1", port=8000)