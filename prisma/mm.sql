-- 1. Limpieza total (Ordenada para evitar errores de dependencias)
DROP TABLE IF EXISTS producto_aditamentos CASCADE;
DROP TABLE IF EXISTS comanda_aditamentos CASCADE;
DROP TABLE IF EXISTS detalle_comanda CASCADE;
DROP TABLE IF EXISTS comandas CASCADE;
DROP TABLE IF EXISTS productos CASCADE;
DROP TABLE IF EXISTS mesas CASCADE;
DROP TABLE IF EXISTS meseros CASCADE;
DROP TABLE IF EXISTS "Usuario" CASCADE;
DROP TABLE IF EXISTS aditamentos CASCADE;

-- 2. Creación de Tablas (Sin prefijos de esquema)
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

CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    precio NUMERIC(10,2) DEFAULT 0.0 NOT NULL,
    categoria TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    tiempo_prep INTEGER DEFAULT 0 NOT NULL,
    pasos TEXT
);

CREATE TABLE comandas (
    id_comanda SERIAL PRIMARY KEY,
    id_mesa INTEGER NOT NULL REFERENCES mesas(id_mesa),
    id_mesero INTEGER NOT NULL REFERENCES meseros(id_mesero),
    fecha_hora TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    estado TEXT DEFAULT 'Abierta' NOT NULL,
    token TEXT
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

-- ESTA TABLA FALTABA EN TU SCRIPT ANTERIOR
CREATE TABLE producto_aditamentos (
    id_producto SERIAL NOT NULL REFERENCES productos(id_producto) ON DELETE CASCADE,
    id_aditamento INTEGER NOT NULL REFERENCES aditamentos(id_aditamento) ON DELETE CASCADE,
    PRIMARY KEY (id_producto, id_aditamento)
);

-- 3. Inserción de Datos
INSERT INTO "Usuario" (id, usuario, email, password, rol, fecha_creacion) VALUES 
(1, 'yukio', '1234@gmail.com', '$2b$10$tfDt1KmEwAj80c9VRQd3ReP/OCM/aRPfd691sUuMv2w//LhZE2G5q', 'hostess', '2026-01-17 08:23:50.518');

INSERT INTO aditamentos (id_aditamento, nombre, precio) VALUES 
(1, 'Extra Queso Parmesano', 25), (2, 'Extra Tocino', 30), (3, 'Huevo Estrellado', 15), 
(4, 'Camarones', 50), (5, 'Pollo', 45), (6, 'Salmon', 55), 
(7, 'Champiñones', 20), (8, 'Leche deslactosada', 10), (9, 'Leche de almendras', 10);

INSERT INTO meseros (id_mesero, nombre, turno) VALUES 
(1, 'Roberto Gómez', 'Matutino'), (2, 'Ana Laura Martínez', 'Matutino'), (3, 'Carlos Slim Domit', 'Matutino'),
(4, 'Elena Poniatowska', 'Vespertino'), (5, 'Miguel Hidalgo', 'Vespertino'), (6, 'Frida Kahlo', 'Vespertino');

INSERT INTO mesas (id_mesa, numero_mesa, capacidad, estado) VALUES 
(1, 1, 2, 'Libre'), (3, 3, 4, 'Libre'), (4, 4, 4, 'Libre'), (5, 5, 4, 'Libre'), 
(6, 6, 6, 'Libre'), (7, 7, 6, 'Libre'), (8, 8, 8, 'Libre'), (9, 9, 2, 'Libre'), 
(10, 10, 4, 'Libre'), (2, 2, 2, 'Libre');

INSERT INTO productos (nombre, precio, categoria, descripcion, tiempo_prep, pasos) VALUES 
('Bruschetta al Pomodoro', 165.00, 'Entrada', 'Pan de campo tostado con ajo, tomates cherry, albahaca fresca y aceite de oliva virgen extra.', 20, 'Pica tomates cherry, mézclalos con albahaca, ajo picado y aceite de oliva; deja marinar 15 min. Tuesta rebanadas de pan rústico, frota un diente de ajo sobre ellas y coloca la mezcla encima.'),
('Carpaccio di Manzo', 120.00, 'Entrada', 'Láminas finas de solomillo de ternera con rúcula, lascas de queso Parmigiano-Reggiano y emulsión de limón.', 15, 'Congela ligeramente el solomillo para poder cortarlo en láminas casi transparentes. Emplata de inmediato añadiendo rúcula, lascas de queso Parmigiano-Reggiano, limón y aceite.'),
('Fiori di Zucca', 190.00, 'Entrada','Flores de calabacín en tempura rellenas de queso ricotta y anchoas.' , 20, 'Limpia las flores retirando el pistilo. Rellénalas con una mezcla de ricotta y un trocito de anchoa. Pásalas por una tempura fría (agua con gas y harina) y fríelas hasta que doren.'),
('Burrata Pugliese', 165.00, 'Entrada','Queso burrata fresco servido sobre un colchón de tomates confitados y pesto de pistacho.', 15, 'Hornea tomates con azúcar y sal para confitarlos. Sirve la burrata a temperatura ambiente sobre el tomate y termina con una lluvia de pesto de pistacho.'),
('Pappardelle al Cinghiale', 170.00, 'Pasta','Pasta ancha hecha a mano con un ragú tradicional de jabalí y hierbas silvestres.', 25, 'Marina el jabalí en vino tinto y especias 24h. Guísalo a fuego lento con sofrito y tomate durante 3 horas. Mezcla con la pasta fresca.'),
('Spaghetti alla Carbonara', 180.00, 'Pasta','La receta auténtica con guanciale, yemas de huevo, queso Pecorino Romano y pimienta negra.', 25, 'Saltea el guanciale. Mezcla yemas con queso y pimienta. Añade la pasta al guanciale fuera del fuego e incorpora la mezcla de huevo con agua de cocción.'),
('Risotto ai Funghi Porcini', 170.00, 'Pasta','Arroz Carnaroli cremoso con hongos boletus frescos y un toque de aceite de trufa blanca.', 30, 'Sofríe cebolla y arroz. Añade caldo poco a poco. A mitad de cocción añade los porcini salteados y finaliza con mantequilla y parmesano.'),
('Lasagna alla Bolognese', 190.00, 'Pasta','Capas de pasta al huevo con salsa boloñesa de larga cocción, bechamel y parmesano.', 30, 'Prepara ragú y bechamel. Intercala capas de pasta, ragú y bechamel. Hornea a 180°C por 25-30 min.'),
('Ossobuco alla Milanese', 210.00, 'Platillo','Jarrete de ternera braseado con vino blanco y verduras, servido con gremolata.', 25, 'Dora el jarrete enharinado. Cocina a fuego lento con vino y verduras por 2 horas. Sirve con gremolata fresca.'),
('Saltimbocca alla Romana', 220.00, 'Platillo','Escalopes de ternera con jamón prosciutto y salvia, cocinados en mantequilla y vino blanco.', 30, 'Fija salvia y jamón a la ternera. Enharina y fríe. Desglasa con vino blanco.'),
('Branzino al Sale', 220.00, 'Platillo','Lubricina (róbalo) entera horneada en costra de sal marina, servida con verduras de temporada.', 35, 'Cubre el pescado con sal y clara de huevo. Hornea a 200°C por 20 min. Rompe la costra para servir.'),
('Tagliata di Manzo', 230.00, 'Platillo','Corte de lomo alto a la parrilla, servido con rúcula, escamas de sal y reducción de balsámico.', 25, 'Sella el lomo a fuego alto. Corta en láminas y sirve sobre rúcula con sal y balsámico.'),
('Tiramisú Tradizionale', 110.00, 'Postre','Bizcochos savoiardi bañados en café espresso, crema de mascarpone y cacao puro.', 10, 'Bate yemas, azúcar y mascarpone. Moja bizcochos en café. Alterna capas, refrigera 4h y añade cacao.'),
('Panna Cotta', 120.00, 'Postre','Crema de nata cocida con vainilla de Madagascar y coulis de frutos rojos.', 10, 'Calienta nata, azúcar y vainilla. Añade gelatina. Vierte en moldes, cuaja 6h y sirve con frutos rojos.'),
('Cannoli Siciliani', 110.00, 'Postre','Tubos de masa crujiente rellenos de crema de ricotta dulce, pistachos y chocolate.', 10, 'Mezcla ricotta, azúcar y chocolate. Rellena los tubos al momento y decora con pistacho.'),
('Gelato Artigianale', 80.00, 'Postre','Selección de helados artesanales.', 10, 'Servir dos bolas de helado artesanal a elección en copa fría.'),
('Chianti Classico', 110.00, 'Bebida','Copa de vino tinto', 5, 'Servir a temperatura ambiente en copa de vino tinto.'),
('Pinot Grigio', 110.00, 'Bebida','Copa de vino blanco', 5, 'Servir frío en copa de vino blanco.'),
('Café Espresso', 70.00, 'Bebida','Café espresso intenso', 5, 'Extraer 30ml de café espresso en taza pequeña precalentada.'),
('Naranjada', 50.00, 'Bebida','Naranjada mineral con rodaja de naranja', 5, 'Mezclar jugo de naranja natural con agua mineral y hielo. Decorar con rodaja.');

INSERT INTO producto_aditamentos (id_producto, id_aditamento) VALUES 
-- Bruschetta (ID 1)
(1, 1), (1, 7), 
-- Carbonara (ID 6)
(6, 1), (6, 2), (6, 3),
-- Risotto (ID 7)
(7, 1), (7, 4), (7, 5), (7, 7),
-- Tagliata (ID 12)
(12, 1), (12, 7),
-- Café (ID 19)
(19, 8), (19, 9);


-- 4. Sincronizar secuencias
SELECT setval('aditamentos_id_aditamento_seq', (SELECT max(id_aditamento) FROM aditamentos));
SELECT setval('mesas_id_mesa_seq', (SELECT max(id_mesa) FROM mesas));
SELECT setval('productos_id_producto_seq', (SELECT max(id_producto) FROM productos));
SELECT setval('detalle_comanda_id_detalle_seq', (SELECT max(id_detalle) FROM detalle_comanda));
SELECT setval('comandas_id_comanda_seq', (SELECT max(id_comanda) FROM comandas));
SELECT setval('meseros_id_mesero_seq', (SELECT max(id_mesero) FROM meseros));