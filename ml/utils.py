from datetime import datetime

from fastapi import requests
import holidays
import pandas as pd
from sqlalchemy import create_engine
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

def get_contexto_actual(ciudad="Guadalajara"):
    API_KEY = "18b8ae5f959c416da2940445241211"
    try:
        url = f"http://api.weatherapi.com/v1/current.json?key={API_KEY}&q={ciudad}"
        res = requests.get(url).json()
        condicion = res['current']['condition']['text'].lower()
        
        # Mapeo idéntico al de TypeScript para que hablen el mismo idioma
        if "rain" in condicion or "thunder" in condicion:
            clima_id = 2
        elif "cloud" in condicion or "overcast" in condicion:
            clima_id = 1
        else:
            clima_id = 0
            
        # Festivos con la librería holidays
        mx_holidays = holidays.CountryHoliday('MX')
        es_festivo = 1 if datetime.date.today() in mx_holidays else 0
        
        return es_festivo, clima_id
    except:
        return 0, 0