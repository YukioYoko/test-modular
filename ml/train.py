import pandas as pd
from sqlalchemy import create_engine
from sklearn.ensemble import RandomForestClassifier
from sklearn.multioutput import MultiOutputClassifier
import joblib
import os

# 1. Configuración de conexión (Asegúrate de tener instalada sqlalchemy y psycopg2-binary)
DATABASE_URL = "postgresql://neondb_owner:npg_Qqc7DRHTp6lS@ep-withered-river-ahnhmx9o-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require" 

def entrenar_modelo():
    try:
        engine = create_engine(DATABASE_URL)
        print("⏳ Conectando a Neon y extrayendo datos...")

        # 2. Leemos la vista que agrupa los productos por comanda
        # Esta vista es la que creamos con el SQL del paso anterior
        query = "SELECT * FROM vista_entrenamiento_menus"
        df = pd.read_sql(query, engine)

        if df.empty:
            print("❌ No hay datos suficientes para entrenar.")
            return

        # 3. Definir Características (X) y Objetivos (y)
        # X: El contexto (Hora, Día, Festivo, Clima)
        X = df[['hora', 'dia_semana', 'es_festivo', 'clima_id']]
        
        # y: Las 6 categorías que la IA debe decidir
        y = df[['cat_entrada', 'cat_ensalada', 'cat_pasta', 'cat_fuerte', 'cat_bebida', 'cat_postre']]

        # Limpieza rápida: Llenar nulos (en caso de que falte alguna categoría en una comanda)
        # Esto es vital para que el modelo no falle
        y = y.fillna(method='ffill').fillna(method='bfill').fillna(0)

        print(f"🧠 Entrenando modelo con {len(df)} registros de menús...")

        # 4. Clasificador Multi-Salida con Random Forest
        # Esto permite que el modelo aprenda la relación entre platos
        # (Ej: Si pides Pasta, qué bebida suele acompañar)
        base_rf = RandomForestClassifier(n_estimators=100, random_state=42)
        model = MultiOutputClassifier(base_rf, n_jobs=-1)
        
        model.fit(X, y)

        # 5. Guardar el modelo
        if not os.path.exists('ml'):
            os.makedirs('ml')
            
        joblib.dump(model, 'ml/modelo_multimenu.pkl')
        print("✅ ¡ÉXITO! Nuevo modelo guardado en 'ml/modelo_multimenu.pkl'")

    except Exception as e:
        print(f"❌ Error durante el entrenamiento: {e}")

if __name__ == "__main__":
    entrenar_modelo()