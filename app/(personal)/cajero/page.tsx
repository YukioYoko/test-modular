'use client'
import { useState, useEffect, Suspense } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { confirmarPagoCaja, buscarComandaParaCobro } from './action';
import { CheckCircle2, Search, Camera, XCircle, Loader2, MessageCircle } from 'lucide-react';

// --- PASO 1: Forzar renderizado dinámico para evitar el error de Prerender ---
export const dynamic = 'force-dynamic';

function CajaContent() {
  const [comanda, setComanda] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [pagoExitoso, setPagoExitoso] = useState(false);
  const [waLink, setWaLink] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 }, false);
    scanner.render((text) => {
      try {
        const data = JSON.parse(text);
        handleBuscar(data.id);
        scanner.clear();
      } catch { handleBuscar(parseInt(text)); }
    }, () => {});
    return () => { scanner.clear().catch(() => {}); };
  }, []);

  const handleBuscar = async (id: number) => {
    if (isNaN(id)) return;
    setLoading(true);
    setPagoExitoso(false);
    const res = await buscarComandaParaCobro(id);
    res ? setComanda(res) : setError("No se encontró la comanda");
    setLoading(false);
  };

  const handleCobrar = async () => {
    setLoading(true);
    const res = await confirmarPagoCaja(comanda.id_comanda);
    if (res.success) {
      setWaLink(res.waLink || "");
      setPagoExitoso(true);
    } else {
      setError(res.error || "Error al cobrar");
    }
    setLoading(false);
  };

  const resetCaja = () => {
    setComanda(null);
    setPagoExitoso(false);
    setError("");
    window.location.reload(); 
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900">
      <header className="max-w-6xl mx-auto mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic text-slate-900">Foodlify<span className="text-emerald-500">.POS</span></h1>
          <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Terminal de Cobro v2.0</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="space-y-6">
          <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="flex items-center gap-2 mb-4 text-slate-400 font-bold text-xs uppercase italic">
              <Camera size={16} /> Escanear QR del Cliente
            </div>
            <div id="reader" className="rounded-2xl overflow-hidden border-0 bg-slate-100"></div>
            
            <div className="mt-6 flex gap-2">
              <input 
                type="number" placeholder="ID Manual..." 
                className="flex-1 bg-slate-100 p-4 rounded-xl font-bold border-none focus:ring-2 focus:ring-emerald-500 transition-all"
                onKeyDown={(e) => e.key === 'Enter' && handleBuscar(parseInt(e.currentTarget.value))}
              />
              <button className="bg-slate-900 text-white p-4 rounded-xl hover:bg-emerald-600 transition-colors">
                <Search size={20} />
              </button>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8 flex flex-col justify-between">
          {comanda ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-start border-b border-slate-50 pb-6 mb-6">
                <div>
                  <h2 className="text-4xl font-black text-slate-900 uppercase">Mesa {comanda.mesa.numero_mesa}</h2>
                  <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mt-1">Ticket #{comanda.id_comanda}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Mesero</p>
                  <p className="font-bold text-slate-900">{comanda.id_mesero}</p>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {comanda.detalles.map((d: any) => (
                  <div key={d.id_detalle} className="flex justify-between text-sm font-medium text-slate-600">
                    <span>{d.cantidad}x {d.producto.nombre}</span>
                    <span className="font-bold">${(Number(d.producto.precio) * d.cantidad).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="bg-slate-900 text-white p-8 rounded-[1.5rem] mb-6">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Total a Liquidar</p>
                <h3 className="text-5xl font-black">${comanda.total.toFixed(2)}</h3>
              </div>

              {!pagoExitoso ? (
                <button 
                  onClick={handleCobrar} disabled={loading}
                  className="w-full bg-emerald-500 text-white py-6 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <CheckCircle2 />}
                  Registrar Pago en Efectivo
                </button>
              ) : (
                <div className="space-y-4 animate-in zoom-in duration-300">
                  <a href={waLink} target="_blank" className="w-full bg-[#25D366] text-white py-6 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-lg shadow-emerald-200">
                    <MessageCircle fill="white" /> Enviar Ticket WhatsApp
                  </a>
                  <button onClick={resetCaja} className="w-full text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-900 transition-colors">
                    Siguiente Cliente →
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-300 space-y-4 py-20">
              <div className="p-8 bg-slate-50 rounded-full animate-pulse"><Search size={48} /></div>
              <p className="font-black text-xs uppercase tracking-widest text-center">Escanea o busca una comanda <br/> para comenzar el cobro</p>
            </div>
          )}
          {error && <div className="mt-4 p-4 bg-red-50 text-red-500 rounded-xl text-center text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2"><XCircle size={14}/> {error}</div>}
        </section>
      </main>
    </div>
  );
}

// --- PASO 2: Exportar con Suspense ---
export default function CajaPage() {
  return (
    <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <Loader2 className="animate-spin text-emerald-500" size={48} />
        </div>
    }>
      <CajaContent />
    </Suspense>
  );
}