import { iniciarSesionPrueba } from './action';

export default function MenuPruebaPage() {
  
  // Función envolvente para cumplir con el tipo (formData: FormData) => void
  const handleAction = async (formData: FormData) => {
    const result = await iniciarSesionPrueba();
    if (result?.error) {
      alert(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-(--notWhite) flex items-center justify-center p-6">
      <div className="max-w-sm w-full bg-white rounded-[3rem] p-10 shadow-2xl text-center border border-slate-100">
        <div className="w-20 h-20 bg-(--light-green) rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🧪</span>
        </div>
        
        <h1 className="text-3xl font-black text-(--militar-green) italic uppercase tracking-tighter mb-4 leading-none">
          Foodlify <br/> <span className="text-slate-400">Beta Test</span>
        </h1>
        
        <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">
          Estás por ingresar a una sesión de prueba masiva. <br/>
          <strong>Mesa asignada: 99</strong>
        </p>

        {/* Usamos la función envolvente aquí */}
        <form action={handleAction}>
          <button 
            type="submit"
            className="w-full py-5 bg-(--militar-green) text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-lg hover:scale-[1.05] active:scale-95 transition-all"
          >
            Generar Comanda y Entrar
          </button>
        </form>

        <p className="mt-6 text-[9px] font-bold text-slate-300 uppercase tracking-widest">
          Los pedidos realizados llegarán al monitor de cocina.
        </p>
      </div>
    </div>
  );
}