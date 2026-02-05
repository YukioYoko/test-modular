// app/(admin)/layout.tsx
import { AdminHeader } from "@/components";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Validamos la sesión directamente desde la cookie que creamos en tu Action
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session_user");

  if (!sessionCookie) {
    redirect("/login");
  }

  const user = JSON.parse(sessionCookie.value);

  // Si no es admin, lo sacamos de aquí
  if (user.rol !== "admin") {
    redirect("/home"); // O a su respectiva página
  }

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader /> 
      <main className="flex-1 p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
}