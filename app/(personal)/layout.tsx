// app/(personal)/layout.tsx
import { Header } from "@/components"; // Un header mucho más limpio

export default function PersonalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Solo muestra el Logo, Nombre del Rol y Botón de Salir */}
      <Header /> 
      
      <main className="flex-1">
        {/* Sin padding excesivo para que las comandas ocupen toda la pantalla */}
        {children}
      </main>
    </div>
  );
}