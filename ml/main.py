from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import datetime
import os
from .utils import get_contexto_actual # La función que creamos antes

app = FastAPI()

# Configurar CORS para que Vercel pueda consultar a Render
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción cambia "*" por tu URL de Vercel
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("ml/modelo_rf.pkl")

@app.get("/recomendar-menu")
def recomendar_menu(ciudad: str = "Guadalajara"):
    ahora = datetime.datetime.now()
    festivo, clima = get_contexto_actual(ciudad)
    
    # El modelo predice la categoría "Estrella" (ej. Plato Fuerte)
    # Basado en eso, armamos el resto del menú
    id_cat_estrella = int(model.predict([[ahora.hour, ahora.weekday(), festivo, clima]])[0])
    
    # Lógica de negocio para categorías complementarias
    # Esto es un mapeo que tú defines: Si la estrella es 'Cortes', busca entradas de 'Carnes'
    return {
        "categoria_principal": id_cat_estrella,
        "menu_sugerido": {
            "entrada": 1,   # IDs de categorías que tu Front-end filtrará
            "fuerte": id_cat_estrella,
            "bebida": 3,
            "postre": 4
        },
        "meta": {
            "clima_id": clima,
            "es_festivo": bool(festivo)
        }
    }



# action.ts
# export async function getFullMenuIA() {
#   try {
#     const res = await fetch(`${process.env.NEXT_PUBLIC_IA_API_URL}/predict-menu`);
#     const data = await res.json();
    
#     if (!data.success) return null;

#     const cats = data.sugerencia;

#     // Buscamos un producto aleatorio de cada categoría sugerida en Neon
#     const [entrada, fuerte, bebida, postre] = await Promise.all([
#       prisma.producto.findFirst({ where: { id_categoria: cats.entrada_cat, activo: true } }),
#       prisma.producto.findFirst({ where: { id_categoria: cats.plato_fuerte_cat, activo: true } }),
#       prisma.producto.findFirst({ where: { id_categoria: cats.bebida_cat, activo: true } }),
#       prisma.producto.findFirst({ where: { id_categoria: cats.postre_cat, activo: true } }),
#     ]);

#     return {
#         items: [entrada, fuerte, bebida, postre],
#         clima: data.clima_info
#     };
#   } catch (e) {
#     console.error(e);
#     return null;
#   }
# }