import pandas as pd
from sqlalchemy import create_engine
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

# Cambia esto por tu URL de Neon
DATABASE_URL = os.getenv("DATABASE_URL")

def entrenar():
    engine = create_engine(DATABASE_URL)
    query = """
    SELECT 
        EXTRACT(HOUR FROM c.fecha_creacion) as hora,
        EXTRACT(DOW FROM c.fecha_creacion) as dia,
        c.es_festivo, c.clima_id, p.id_categoria
    FROM "Comanda" c
    JOIN "DetalleComanda" dc ON c.id_comanda = dc.id_comanda
    JOIN "Producto" p ON dc.id_producto = p.id_producto
    """
    df = pd.read_sql(query, engine)
    
    if df.empty:
        print("No hay datos en Neon para entrenar.")
        return

    X = df[['hora', 'dia', 'es_festivo', 'clima_id']]
    y = df['id_categoria']
    
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X, y)
    
    joblib.dump(model, 'ml/modelo_rf.pkl')
    print("Entrenamiento completado. Archivo ml/modelo_rf.pkl generado.")

if __name__ == "__main__":
    entrenar()