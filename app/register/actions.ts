'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcryptjs'

export async function registrarUsuario(formData: FormData) {
  const usuario = formData.get('usuario') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const rol = formData.get('rol') as string

  try {
    // 1. Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // 2. Guardar en la base de datos
    await prisma.usuario.create({
      data: {
        usuario,
        email,
        password: hashedPassword, // Guardamos el hash, no el texto plano
        rol,
      }
    })

    revalidatePath('/admin/usuarios')
    return { success: true }
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { error: 'El correo electrónico ya está registrado.' }
    }
    return { error: 'Error al crear el usuario.' }
  }
}