'use server'

import {prisma} from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function loginUsuario(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    console.log(email, password);
    // 1. Buscar al usuario en la base de datos "Veterinaria"
    const usuario = await prisma.usuario.findUnique({
      where: { email: email },
    })

    if (!usuario) {
      return { error: 'Credenciales inválidas' }
    }

    // 2. Comparar el hash de la contraseña
    // Recuerda que al registrar usuarios debes usar bcrypt.hash()
    //const esValida = await bcrypt.compare(password, usuario.password)

    //if (!esValida) {
    if (password !== usuario.password){
      return { error: 'Credenciales inválidas' }
    }

    // 3. Login exitoso
    // Aquí es donde normalmente configurarías una cookie o JWT
    return { success: true }

  } catch (err) {
    console.error(err)
    return { error: 'Error de conexión con el servidor' }
  }
}