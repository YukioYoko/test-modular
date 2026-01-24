-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "usuario" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meseros" (
    "id_mesero" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "turno" TEXT NOT NULL,

    CONSTRAINT "meseros_pkey" PRIMARY KEY ("id_mesero")
);

-- CreateTable
CREATE TABLE "mesas" (
    "id_mesa" SERIAL NOT NULL,
    "numero_mesa" INTEGER NOT NULL,
    "capacidad" INTEGER NOT NULL DEFAULT 1,
    "estado" TEXT NOT NULL DEFAULT 'Libre',
    "junta_id_mesa" INTEGER,

    CONSTRAINT "mesas_pkey" PRIMARY KEY ("id_mesa")
);

-- CreateTable
CREATE TABLE "productos" (
    "id_producto" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "precio" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "categoria" TEXT NOT NULL,
    "tiempo_prep" INTEGER NOT NULL DEFAULT 0,
    "pasos" TEXT,

    CONSTRAINT "productos_pkey" PRIMARY KEY ("id_producto")
);

-- CreateTable
CREATE TABLE "aditamentos" (
    "id_aditamento" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL DEFAULT 0.0,

    CONSTRAINT "aditamentos_pkey" PRIMARY KEY ("id_aditamento")
);

-- CreateTable
CREATE TABLE "producto_aditamentos" (
    "id_producto" INTEGER NOT NULL,
    "id_aditamento" INTEGER NOT NULL,

    CONSTRAINT "producto_aditamentos_pkey" PRIMARY KEY ("id_producto","id_aditamento")
);

-- CreateTable
CREATE TABLE "comandas" (
    "id_comanda" SERIAL NOT NULL,
    "id_mesa" INTEGER NOT NULL,
    "id_mesero" INTEGER NOT NULL,
    "fecha_hora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" TEXT NOT NULL DEFAULT 'Abierta',
    "token" TEXT,

    CONSTRAINT "comandas_pkey" PRIMARY KEY ("id_comanda")
);

-- CreateTable
CREATE TABLE "detalle_comanda" (
    "id_detalle" SERIAL NOT NULL,
    "id_comanda" INTEGER NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL DEFAULT 1,
    "notas_especiales" TEXT DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'En espera',

    CONSTRAINT "detalle_comanda_pkey" PRIMARY KEY ("id_detalle")
);

-- CreateTable
CREATE TABLE "comanda_aditamentos" (
    "id_detalle" INTEGER NOT NULL,
    "id_aditamento" INTEGER NOT NULL,
    "confirmacion" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "comanda_aditamentos_pkey" PRIMARY KEY ("id_detalle","id_aditamento")
);

-- CreateTable
CREATE TABLE "ingredientes" (
    "id_ingrediente" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" TEXT NOT NULL DEFAULT 'Pza',

    CONSTRAINT "ingredientes_pkey" PRIMARY KEY ("id_ingrediente")
);

-- CreateTable
CREATE TABLE "stock" (
    "id_stock" SERIAL NOT NULL,
    "id_ingrediente" INTEGER NOT NULL,
    "marca" TEXT DEFAULT '',
    "cantidad_ml" DOUBLE PRECISION,
    "cantidad_gr" DOUBLE PRECISION,
    "cantidad_pz" DOUBLE PRECISION,

    CONSTRAINT "stock_pkey" PRIMARY KEY ("id_stock")
);

-- CreateTable
CREATE TABLE "receta" (
    "id_receta" SERIAL NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "id_ingrediente" INTEGER NOT NULL,
    "cantidad" DOUBLE PRECISION NOT NULL DEFAULT 0.0,

    CONSTRAINT "receta_pkey" PRIMARY KEY ("id_receta")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_usuario_key" ON "Usuario"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "mesas_numero_mesa_key" ON "mesas"("numero_mesa");

-- AddForeignKey
ALTER TABLE "producto_aditamentos" ADD CONSTRAINT "producto_aditamentos_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "productos"("id_producto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producto_aditamentos" ADD CONSTRAINT "producto_aditamentos_id_aditamento_fkey" FOREIGN KEY ("id_aditamento") REFERENCES "aditamentos"("id_aditamento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comandas" ADD CONSTRAINT "comandas_id_mesa_fkey" FOREIGN KEY ("id_mesa") REFERENCES "mesas"("id_mesa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comandas" ADD CONSTRAINT "comandas_id_mesero_fkey" FOREIGN KEY ("id_mesero") REFERENCES "meseros"("id_mesero") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_comanda" ADD CONSTRAINT "detalle_comanda_id_comanda_fkey" FOREIGN KEY ("id_comanda") REFERENCES "comandas"("id_comanda") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_comanda" ADD CONSTRAINT "detalle_comanda_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "productos"("id_producto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comanda_aditamentos" ADD CONSTRAINT "comanda_aditamentos_id_detalle_fkey" FOREIGN KEY ("id_detalle") REFERENCES "detalle_comanda"("id_detalle") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comanda_aditamentos" ADD CONSTRAINT "comanda_aditamentos_id_aditamento_fkey" FOREIGN KEY ("id_aditamento") REFERENCES "aditamentos"("id_aditamento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_id_ingrediente_fkey" FOREIGN KEY ("id_ingrediente") REFERENCES "ingredientes"("id_ingrediente") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "receta" ADD CONSTRAINT "receta_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "productos"("id_producto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receta" ADD CONSTRAINT "receta_id_ingrediente_fkey" FOREIGN KEY ("id_ingrediente") REFERENCES "ingredientes"("id_ingrediente") ON DELETE RESTRICT ON UPDATE CASCADE;
