'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
// Nota: En producción, usa una librería como 'jose' para firmar JWTs
// o simplemente delega esto a NextAuth.js para máxima seguridad.

export async function loginUsuario(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // 1. Validación básica de entrada
  if (!email || !password) {
    return { error: 'Por favor, rellena todos los campos' }
  }

  try {
    // 2. Buscar usuario con selección específica (no traer password si no es necesario)
    const usuario = await prisma.usuario.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (!usuario) {
      return { error: 'Credenciales inválidas' }
    }

    // 3. Comparar Hash (¡Crucial para producción!)
    // Asumiendo que al crear el usuario usaste bcrypt.hash(password, 10)
    const esValida = await bcrypt.compare(password, usuario.password)

    if (!esValida) {
      return { error: 'Credenciales inválidas' }
    }

    // 4. Gestión de Sesión (Ejemplo simplificado con cookies)
    // En un entorno real, aquí generarías un token JWT firmado
    const cookieStore = await cookies()
    // BUSCA ESTA LÍNEA Y CÁMBIALA:
cookieStore.set('session_user', JSON.stringify({ 
  id: usuario.id, 
  rol: usuario.rol 
}), {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24,
  path: '/', // <--- CAMBIA ESTO A '/' PARA QUE FUNCIONE EN TODO EL SITIO
})

    return { success: true, rol: usuario.rol }

  } catch (err) {
    console.error("Login Error:", err)
    return { error: 'Error interno del servidor' }
  }
}