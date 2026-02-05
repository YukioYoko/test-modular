// En tu archivo de actions.ts
'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('session_user'); // El mismo nombre que usaste en el login
  redirect('/login');
}