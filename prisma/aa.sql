-- ==========================================================
-- 1. LIMPIEZA TOTAL
-- ==========================================================
DROP TABLE IF EXISTS historial_analitico CASCADE;
DROP TABLE IF EXISTS comanda_aditamentos CASCADE;
DROP TABLE IF EXISTS detalle_comanda CASCADE;
DROP TABLE IF EXISTS comandas CASCADE;
DROP TABLE IF EXISTS producto_aditamentos CASCADE;
DROP TABLE IF EXISTS producto_imagen CASCADE;
DROP TABLE IF EXISTS productos CASCADE;
DROP TABLE IF EXISTS subcategorias CASCADE;
DROP TABLE IF EXISTS mesas CASCADE;
DROP TABLE IF EXISTS meseros CASCADE;
DROP TABLE IF EXISTS "Usuario" CASCADE;
DROP TABLE IF EXISTS aditamentos CASCADE;

-- ==========================================================
-- 2. CREACIÓN DE TABLAS
-- ==========================================================

CREATE TABLE "Usuario" (
    id SERIAL PRIMARY KEY,
    usuario TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    rol TEXT NOT NULL,
    fecha_creacion TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE aditamentos (
    id_aditamento SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    precio DOUBLE PRECISION DEFAULT 0.0 NOT NULL
);

CREATE TABLE meseros (
    id_mesero SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    turno TEXT NOT NULL
);

CREATE TABLE mesas (
    id_mesa SERIAL PRIMARY KEY,
    numero_mesa INTEGER NOT NULL UNIQUE,
    capacidad INTEGER DEFAULT 1 NOT NULL,
    estado TEXT DEFAULT 'Libre' NOT NULL,
    junta_id_mesa INTEGER
);

-- NUEVA: Tabla de Subcategorías
CREATE TABLE subcategorias (
    id_subcategoria SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL
);

CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    precio DECIMAL(10,2) DEFAULT 0.0 NOT NULL,
    categoria TEXT NOT NULL, -- Mantenemos el texto para el front
    id_subcategoria INTEGER NOT NULL REFERENCES subcategorias(id_subcategoria),
    descripcion TEXT,
    tiempo_prep INTEGER DEFAULT 0 NOT NULL,
    pasos TEXT,
    activo BOOLEAN DEFAULT false NOT NULL, -- Por defecto false según tu Prisma
    eliminado BOOLEAN DEFAULT false NOT NULL
);

-- NUEVA: Tabla de Historial Analítico para Random Forest
CREATE TABLE historial_analitico (
    id_historial SERIAL PRIMARY KEY,
    id_producto INTEGER NOT NULL REFERENCES productos(id_producto),
    id_subcategoria INTEGER NOT NULL,
    categoria_nom TEXT NOT NULL,
    hora INTEGER NOT NULL,
    dia_semana INTEGER NOT NULL,
    es_festivo BOOLEAN DEFAULT false NOT NULL,
    clima_id INTEGER NOT NULL,
    fecha_registro TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE producto_imagen (
    id_imagen SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    id_producto INTEGER NOT NULL REFERENCES productos(id_producto) ON DELETE CASCADE
);

CREATE TABLE producto_aditamentos (
    id_producto INTEGER NOT NULL REFERENCES productos(id_producto) ON DELETE CASCADE,
    id_aditamento INTEGER NOT NULL REFERENCES aditamentos(id_aditamento) ON DELETE CASCADE,
    PRIMARY KEY (id_producto, id_aditamento)
);

CREATE TABLE comandas (
    id_comanda SERIAL PRIMARY KEY,
    id_mesa INTEGER NOT NULL REFERENCES mesas(id_mesa),
    id_mesero INTEGER NOT NULL REFERENCES meseros(id_mesero),
    fecha_hora TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    estado TEXT DEFAULT 'Abierta' NOT NULL,
    token TEXT,
    fecha_pagado TIMESTAMP(3),
    impuestos DOUBLE PRECISION DEFAULT 0.0 NOT NULL,
    pagado BOOLEAN DEFAULT false NOT NULL,
    sub_total DOUBLE PRECISION DEFAULT 0.0 NOT NULL,
    total DOUBLE PRECISION DEFAULT 0.0 NOT NULL,
    transaccion_id TEXT,
    metodo_pago TEXT
);

CREATE TABLE detalle_comanda (
    id_detalle SERIAL PRIMARY KEY,
    id_comanda INTEGER NOT NULL REFERENCES comandas(id_comanda),
    id_producto INTEGER NOT NULL REFERENCES productos(id_producto),
    cantidad INTEGER DEFAULT 1 NOT NULL,
    notas_especiales TEXT DEFAULT '',
    status TEXT DEFAULT 'En espera' NOT NULL
);

CREATE TABLE comanda_aditamentos (
    id_detalle INTEGER NOT NULL REFERENCES detalle_comanda(id_detalle),
    id_aditamento INTEGER NOT NULL REFERENCES aditamentos(id_aditamento),
    confirmacion BOOLEAN DEFAULT false NOT NULL,
    PRIMARY KEY (id_detalle, id_aditamento)
);

-- ==========================================================
-- 3. INSERCIÓN DE DATOS INICIALES
-- ==========================================================

-- Insertar Subcategorías primero
-- ==========================================================
-- INSERCIÓN DE DATOS COMPLETOS
-- ==========================================================

-- 1. Subcategorías (Necesarias para los productos)
INSERT INTO subcategorias (id_subcategoria, nombre) VALUES 
(1, 'Antipasti'), 
(2, 'Pasta Fresca'), 
(3, 'Carni e Pesce'), 
(4, 'Dolci'), 
(5, 'Vini e Caffè');

-- 2. Usuarios
INSERT INTO "Usuario" (id, usuario, email, password, rol, fecha_creacion) VALUES 
(1, 'yukio', '1234@gmail.com', '$2b$10$tfDt1KmEwAj80c9VRQd3ReP/OCM/aRPfd691sUuMv2w//LhZE2G5q', 'hostess', '2026-01-17 08:23:50.518'),
(2, 'admin', 'admin@ad.com', '$2b$10$9Zy856n4O0z6cy4ijws4fuQx/hmlnTqtXzKg3whq4Evh6A8kO/caC', 'admin', '2026-01-17 08:23:50.518');

-- 3. Aditamentos
INSERT INTO aditamentos (id_aditamento, nombre, precio) VALUES 
(1, 'Extra Queso Parmesano', 25), (2, 'Extra Tocino', 30), (3, 'Huevo Estrellado', 15), 
(4, 'Camarones', 50), (5, 'Pollo', 45), (6, 'Salmon', 55), 
(7, 'Champiñones', 20), (8, 'Leche deslactosada', 10), (9, 'Leche de almendras', 10);

-- 4. Meseros
INSERT INTO meseros (id_mesero, nombre, turno) VALUES 
(1, 'Roberto Gómez', 'Matutino'), (2, 'Ana Laura Martínez', 'Matutino'), (3, 'Carlos Slim Domit', 'Matutino'),
(4, 'Elena Poniatowska', 'Vespertino'), (5, 'Miguel Hidalgo', 'Vespertino'), (6, 'Frida Kahlo', 'Vespertino');

-- 5. Mesas
INSERT INTO mesas (id_mesa, numero_mesa, capacidad, estado) VALUES 
(1, 1, 2, 'Libre'), (3, 3, 4, 'Libre'), (4, 4, 4, 'Libre'), (5, 5, 4, 'Libre'), 
(6, 6, 6, 'Libre'), (7, 7, 6, 'Libre'), (8, 8, 8, 'Libre'), (9, 9, 2, 'Libre'), 
(10, 10, 4, 'Libre'), (2, 2, 2, 'Libre');

-- 6. Productos (Con id_subcategoria asignado)
INSERT INTO productos (id_producto, nombre, precio, categoria, id_subcategoria, descripcion, tiempo_prep, pasos, activo) VALUES 
(1, 'Bruschetta al Pomodoro', 165.00, 'Entrada', 1, 'Pan de campo tostado con ajo, tomates cherry, albahaca fresca y aceite de oliva virgen extra.', 20, 'Pica tomates cherry...', true),
(2, 'Carpaccio di Manzo', 120.00, 'Entrada', 1, 'Láminas finas de solomillo de ternera con rúcula...', 15, 'Congela ligeramente...', true),
(3, 'Fiori di Zucca', 190.00, 'Entrada', 1, 'Flores de calabacín en tempura rellenas de queso ricotta y anchoas.', 20, 'Limpia las flores...', true),
(4, 'Burrata Pugliese', 165.00, 'Entrada', 1, 'Queso burrata fresco servido sobre un colchón de tomates confitados.', 15, 'Hornea tomates...', true),
(5, 'Pappardelle al Cinghiale', 170.00, 'Pasta', 2, 'Pasta ancha hecha a mano con un ragú tradicional de jabalí.', 25, 'Marina el jabalí...', true),
(6, 'Spaghetti alla Carbonara', 180.00, 'Pasta', 2, 'La receta auténtica con guanciale, yemas de huevo y pecorino.', 25, 'Saltea el guanciale...', true),
(7, 'Risotto ai Funghi Porcini', 170.00, 'Pasta', 2, 'Arroz Carnaroli cremoso con hongos boletus frescos.', 30, 'Sofríe cebolla...', true),
(8, 'Lasagna alla Bolognese', 190.00, 'Pasta', 2, 'Capas de pasta al huevo con salsa boloñesa de larga cocción.', 30, 'Prepara ragú...', true),
(9, 'Ossobuco alla Milanese', 210.00, 'Platillo', 3, 'Jarrete de ternera braseado con vino blanco y verduras.', 25, 'Dora el jarrete...', true),
(10, 'Saltimbocca alla Romana', 220.00, 'Platillo', 3, 'Escalopes de ternera con jamón prosciutto y salvia.', 30, 'Fija salvia...', true),
(11, 'Branzino al Sale', 220.00, 'Platillo', 3, 'Lubricina (róbalo) entera horneada en costra de sal marina.', 35, 'Cubre el pescado...', true),
(12, 'Tagliata di Manzo', 230.00, 'Platillo', 3, 'Corte de lomo alto a la parrilla con rúcula y balsámico.', 25, 'Sella el lomo...', true),
(13, 'Tiramisú Tradizionale', 110.00, 'Postre', 4, 'Bizcochos savoiardi bañados en café espresso y mascarpone.', 10, 'Bate yemas...', true),
(14, 'Panna Cotta', 120.00, 'Postre', 4, 'Crema de nata cocida con vainilla y coulis de frutos rojos.', 10, 'Calienta nata...', true),
(15, 'Cannoli Siciliani', 110.00, 'Postre', 4, 'Tubos de masa crujiente rellenos de crema de ricotta dulce.', 10, 'Mezcla ricotta...', true),
(16, 'Gelato Artigianale', 80.00, 'Postre', 4, 'Selección de helados artesanales.', 10, 'Servir dos bolas...', true),
(17, 'Chianti Classico', 110.00, 'Bebida', 5, 'Copa de vino tinto', 5, 'Servir a temperatura...', true),
(18, 'Pinot Grigio', 110.00, 'Bebida', 5, 'Copa de vino blanco', 5, 'Servir frío...', true),
(19, 'Café Espresso', 70.00, 'Bebida', 5, 'Café espresso intenso', 5, 'Extraer 30ml...', true),
(20, 'Naranjada', 50.00, 'Bebida', 5, 'Naranjada mineral con rodaja de naranja', 5, 'Mezclar jugo...');

-- 7. Producto_Aditamentos
INSERT INTO producto_aditamentos (id_producto, id_aditamento) VALUES 
(1, 1), (1, 7), (6, 1), (6, 2), (6, 3), (7, 1), (7, 4), (7, 5), (7, 7), (12, 1), (12, 7), (19, 8), (19, 9);

-- 8. Sincronizar secuencias
SELECT setval('aditamentos_id_aditamento_seq', (SELECT max(id_aditamento) FROM aditamentos));
SELECT setval('mesas_id_mesa_seq', (SELECT max(id_mesa) FROM mesas));
SELECT setval('productos_id_producto_seq', (SELECT max(id_producto) FROM productos));
SELECT setval('subcategorias_id_subcategoria_seq', (SELECT max(id_subcategoria) FROM subcategorias));
