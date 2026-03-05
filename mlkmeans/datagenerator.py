import pandas as pd
import random
import datetime
from sqlalchemy import create_engine

# Configuración de tu conexión a Neon
DATABASE_URL = "postgresql://neondb_owner:npg_Qqc7DRHTp6lS@ep-withered-river-ahnhmx9o-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require" 
engine = create_engine(DATABASE_URL)

# Mapeo completo de TODOS tus productos por categoría
menu_completo = {
    1: [1, 2, 3, 4, 39, 40, 41],    # Entradas (Bruschettas, Carpaccios, etc.)
    2: [5, 6, 7, 8, 42, 43, 44, 45],# Pastas (Pappardelle, Spaghetti, Lasagna)
    3: [9, 10, 11, 12, 46, 47, 48], # Platillos Fuertes (Ossobuco, Salmón, Pollo)
    4: [13, 14, 15, 16],            # Postres (Tiramisú, Panna Cotta, Gelato)
    5: [17, 18, 19, 20, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33], # Bebidas
    6: [34, 35, 36, 37, 38]         # Ensaladas
}

# Precios para calcular totales reales
precios = {
    1: 165.0, 2: 120.0, 3: 190.0, 4: 165.0, 5: 170.0, 6: 180.0, 7: 170.0, 8: 190.0,
    9: 210.0, 10: 220.0, 11: 220.0, 12: 230.0, 13: 110.0, 14: 120.0, 15: 110.0, 16: 80.0,
    17: 110.0, 18: 110.0, 19: 70.0, 20: 50.0, 22: 120.0, 23: 120.0, 24: 140.0, 25: 100.0,
    26: 85.0, 27: 90.0, 28: 95.0, 29: 40.0, 30: 40.0, 31: 40.0, 32: 50.0, 33: 60.0,
    34: 125.0, 35: 120.0, 36: 110.0, 37: 120.0, 38: 130.0, 39: 130.0, 40: 140.0, 
    41: 180.0, 42: 150.0, 43: 170.0, 44: 180.0, 45: 185.0, 46: 240.0, 47: 250.0, 48: 220.0
}

def generar_datos_parejos(n_comandas=400):
    start_id = 537 # Iniciamos después de la 236
    
    comandas, detalles, historial = [], [], []

    for i in range(n_comandas):
        id_c = start_id + i
        hora = random.randint(12, 22) # Rango de comida y cena
        clima = random.choice([ 1, 2])
        festivo = random.choice([True, False])
        dia = random.randint(0, 6)
        
        # Seleccionamos una muestra representativa de categorías para esta comanda
        num_tiempos = random.randint(3, 6)
        cats_seleccionadas = random.sample(list(menu_completo.keys()), num_tiempos)
        
        total_acumulado = 0
        for cat in cats_seleccionadas:
            p_id = random.choice(menu_completo[cat])
            total_acumulado += precios[p_id]
            
            detalles.append({
                "id_comanda": id_c, "id_producto": p_id, "cantidad": 1, 
                "hora": hora, "status": "Servido"
            })
            
            historial.append({
                "id_producto": p_id, "id_categoria": cat, "id_subcategoria": 1,
                "hora": hora, "dia_semana": dia, "es_festivo": festivo, "clima_id": clima
            })

        comandas.append({
            "id_comanda": id_c, "id_mesa": 6, "id_mesero": 1,
            "estado": "Cerrada", "pagado": True, "sub_total": total_acumulado, "total": total_acumulado
        })

    # Inserción a la DB
    pd.DataFrame(comandas).to_sql('comandas', engine, if_exists='append', index=False)
    pd.DataFrame(detalles).to_sql('detalle_comanda', engine, if_exists='append', index=False)
    pd.DataFrame(historial).to_sql('historial_analitico', engine, if_exists='append', index=False)
    print(f"✅ Se insertaron {n_comandas} comandas usando todo el catálogo de productos.")

def generar_datos_sesgados_postres_v2(n_comandas=30):
    start_id = 1058  # Ajusta según tu secuencia
    comandas, detalles, historial = [], [], []

    # ID de Postres: 13: Tiramisú, 14: Panna Cotta, 15: Gelato, 16: Otros
    print(f"🔄 Generando {n_comandas} ejemplos con lógica de 3 climas...")

    for i in range(n_comandas):
        id_c = start_id + i
        
        # Rotación de clima: 0 (Sol), 1 (Nublado), 2 (Lluvia)
        clima = i % 3 
        hora = random.choice([22, 0]) # Tarde o Noche
        dia = random.randint(0, 6)
        festivo = random.choice([True, False])

        # Lógica de sesgo por Clima
        if clima == 0:
            # Calor: Preferencia alta por Gelato (ID 15)
            p_id = random.choices([15, 14, 13], weights=[75, 15, 10], k=1)[0]
        elif clima == 1:
            # Nublado: Preferencia balanceada, inclinada a Panna Cotta (ID 14)
            p_id = random.choices([14, 13, 16], weights=[60, 30, 10], k=1)[0]
        else:
            # Lluvia: Preferencia alta por Tiramisú (ID 13) y postres densos
            p_id = random.choices([13, 16, 14], weights=[80, 15, 5], k=1)[0]

        precio_p = precios[p_id]

        detalles.append({
            "id_comanda": id_c, "id_producto": p_id, "cantidad": 1, 
            "hora": hora, "status": "Servido"
        })
        
        historial.append({
            "id_producto": p_id, "id_categoria": 4, "id_subcategoria": 1,
            "hora": hora, "dia_semana": dia, "es_festivo": festivo, "clima_id": clima
        })

        comandas.append({
            "id_comanda": id_c, "id_mesa": 1, "id_mesero": 1,
            "estado": "Cerrada", "pagado": True, "sub_total": precio_p, "total": precio_p
        })

    # Inserción masiva a la DB usando pandas
    pd.DataFrame(comandas).to_sql('comandas', engine, if_exists='append', index=False)
    pd.DataFrame(detalles).to_sql('detalle_comanda', engine, if_exists='append', index=False)
    pd.DataFrame(historial).to_sql('historial_analitico', engine, if_exists='append', index=False)
    
    print(f"✅ Éxito: Se inyectaron 30 registros distribuidos en Sol, Nubes y Lluvia.")

if __name__ == "__main__":
   # generar_datos_parejos(400)
   generar_datos_sesgados_postres_v2(50)