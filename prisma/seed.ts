import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../src/generated/prisma/client'
import bcrypt from 'bcryptjs'
import { readFileSync } from 'fs'
import { join } from 'path'

const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

interface BackupUsuario {
  id: number
  usuario: string
  email: string
  password: string
  rol: string
  fecha_creacion: string
}

interface BackupData {
  usuarios: BackupUsuario[]
}

async function main() {
  // Leer el archivo backup_datos.json
  const backupPath = join(__dirname, 'backup_datos.json')
  const backupContent = readFileSync(backupPath, 'utf-8')
  const backup: BackupData = JSON.parse(backupContent)

  console.log(`Importando ${backup.usuarios.length} usuarios...`)

  for (const usuario of backup.usuarios) {
    // Verificar si el usuario ya existe
    const existente = await prisma.usuario.findFirst({
      where: {
        OR: [
          { email: usuario.email },
          { usuario: usuario.usuario }
        ]
      }
    })

    if (existente) {
      console.log(`Usuario "${usuario.usuario}" ya existe, saltando...`)
      continue
    }

    // Hashear la contraseña
    const passwordHash = await bcrypt.hash(usuario.password, 10)

    const created = await prisma.usuario.create({
      data: {
        usuario: usuario.usuario,
        email: usuario.email,
        password: passwordHash,
        rol: usuario.rol,
        fecha_creacion: new Date(usuario.fecha_creacion),
      },
    })

    console.log(`Usuario creado: ${created.usuario} (${created.rol})`)
  }

  console.log('Importación completada!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
