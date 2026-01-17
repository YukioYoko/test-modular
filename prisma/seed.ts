// scripts/extraer-datos.ts
import { prisma } from '../lib/prisma';
import fs from 'fs';

async function main() {
  const productos = await prisma.producto.findMany();
  const mesas = await prisma.mesa.findMany();
  const ingredientes = await prisma.ingrediente.findMany();
  const usuarios = await prisma.usuario.findMany();
  const receta = await prisma.receta.findMany();
  const stock = await prisma.stock.findMany();


  const backup = { productos, mesas, ingredientes, usuarios, receta, stock };
  
  fs.writeFileSync('./prisma/backup_datos.json', JSON.stringify(backup, null, 2));
  console.log("✅ Datos extraídos a backup_datos.json");
}

main();