import holidays
import requests
import datetime
import os

def get_contexto_actual(ciudad="Guadalajara"):
    # 1. Verificar Festivo (México 'MX')
    mx_holidays = holidays.CountryHoliday('MX')
    es_festivo = 1 if datetime.date.today() in mx_holidays else 0
    
    # 2. Obtener Clima
    # La API Key se jalará de las variables de entorno de Render
    API_KEY = os.getenv("OPENWEATHER_API_KEY", "TU_API_KEY_AQUI")
    try:
        url = f"http://api.openweathermap.org/data/2.5/weather?q={ciudad}&appid={API_KEY}"
        res = requests.get(url).json()
        clima_main = res['weather'][0]['main']
        
        # Mapeo: 0:Despejado, 1:Nubes, 2:Lluvia/Tormenta, 3:Otros
        mapping = {"Clear": 0, "Clouds": 1, "Rain": 2, "Drizzle": 2, "Thunderstorm": 2}
        clima_id = mapping.get(clima_main, 3)
    except Exception as e:
        print(f"Error clima: {e}")
        clima_id = 0 # Fallback despejado
        
    return es_festivo, clima_id