'use client'
import { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { confirmarPagoCaja, buscarComandaParaCobro } from './action';
import { CheckCircle2, Search, Camera, XCircle, Loader2, MessageCircle, Phone, History, ArrowUpRight } from 'lucide-react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

export default function CajaClient() {
  const [comanda, setComanda] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [pagado, setPagado] = useState(false);
  const [pagoExitoso, setPagoExitoso] = useState(false);
  const [waLinkBase, setWaLinkBase] = useState(""); 
  const [telefono, setTelefono] = useState(""); 
  const [error, setError] = useState("");
  const [historial, setHistorial] = useState<any[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0 
    }, false);

    scanner.render((text) => {
      try {
        const data = JSON.parse(text);
        handleBuscar(data.id);
        scanner.clear();
      } catch { 
        handleBuscar(parseInt(text)); 
      }
    }, () => {});

    return () => { scanner.clear().catch(() => {}); };
  }, []);

  const handleBuscar = async (id: number) => {
    if (isNaN(id)) return;
    setLoading(true);
    setPagoExitoso(false);
    setTelefono("");
    setError("");
    const res = await buscarComandaParaCobro(id);
    if (res) {
        setComanda(res);
        setPagado(res.pagado);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        setError("Comanda no encontrada");
        setComanda(null);
    }
    setLoading(false);
  };

  const handleCobrar = async () => {
    if (!comanda) return;
    setLoading(true);
    const res = await confirmarPagoCaja(comanda.id_comanda, telefono);
    
    if (res.success) {
      setWaLinkBase(res.waLink || ""); 
      setPagoExitoso(true);
      setPagado(true);

      const nuevoRegistro = {
        id: comanda.id_comanda,
        mesa: comanda.mesa?.numero_mesa,
        total: comanda.total,
        fecha: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setHistorial(prev => [nuevoRegistro, ...prev].slice(0, 3));

      if (!socketRef.current) {
          socketRef.current = io(SOCKET_URL, { transports: ["websocket"] });
      }
      socketRef.current.emit("order_pay", { idComanda: comanda.id_comanda });
    } else {
      setError(res.error || "Error al procesar el pago");
    }
    setLoading(false);
  };

  const resetCaja = () => {
    setComanda(null);
    setPagoExitoso(false);
    setPagado(false);
    setTelefono("");
    setError("");
  };

  // --- FUNCIÓN RECUPERADA ---
  const getWhatsAppFinalLink = () => {
    if (!waLinkBase) return "#";
    const numLimpio = telefono.replace(/\D/g, '');
    const prefix = numLimpio.startsWith('52') ? '' : '52';
    // Reemplazamos el placeholder del link base generado por el server action
    return `${waLinkBase.replace('https://wa.me/?text=', `https://wa.me/${prefix}${numLimpio}?text=`)}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 font-sans text-slate-900">
      <header className="max-w-6xl mx-auto mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic text-slate-900">
            Foodlify<span className="text-emerald-500">.POS</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Terminal de Cobro v2.0</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* COLUMNA IZQUIERDA: ESCÁNER E HISTORIAL */}
        <div className="lg:col-span-4 space-y-6 order-last lg:order-first">
          <section className={`bg-white p-6 rounded-[2rem] shadow-xl border border-slate-100 transition-opacity ${comanda ? 'opacity-40' : 'opacity-100'}`}>
            <div className="flex items-center gap-2 mb-4 text-slate-400 font-bold text-xs uppercase italic justify-center">
              <Camera size={16} /> Escáner
            </div>
            <div id="reader" className="rounded-2xl overflow-hidden bg-slate-100 min-h-[250px]"></div>
            <div className="mt-4 flex gap-2">
              <input 
                type="number" 
                placeholder="Folio..." 
                className="flex-1 bg-slate-100 p-3 rounded-xl font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                onKeyDown={(e) => e.key === 'Enter' && handleBuscar(parseInt(e.currentTarget.value))}
              />
              <button onClick={() => {
                const input = document.querySelector('input[type="number"]') as HTMLInputElement;
                handleBuscar(parseInt(input.value));
              }} className="bg-slate-900 text-white p-3 rounded-xl"><Search size={18} /></button>
            </div>
          </section>

          <section className="bg-white p-6 rounded-[2rem] shadow-lg border border-slate-100">
            <div className="flex items-center gap-2 mb-4 text-slate-400 font-black text-[10px] uppercase tracking-widest">
              <History size={14} /> Últimos Cobros
            </div>
            <div className="space-y-3">
              {historial.length > 0 ? historial.map((h, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 animate-in slide-in-from-left-2">
                  <div>
                    <p className="text-[10px] font-black text-slate-900 uppercase">Mesa {h.mesa} <span className="text-slate-400 ml-1">#{h.id}</span></p>
                    <p className="text-[9px] font-bold text-slate-400">{h.fecha}</p>
                  </div>
                  <p className="font-black text-emerald-600 text-sm">${Number(h.total).toFixed(2)}</p>
                </div>
              )) : (
                <p className="text-[10px] text-slate-300 font-bold text-center py-4 uppercase tracking-tighter italic">No hay cobros recientes</p>
              )}
            </div>
          </section>
        </div>

        {/* COLUMNA DERECHA: DETALLE */}
        <section className={`lg:col-span-8 bg-white rounded-[2rem] shadow-2xl border-2 p-6 md:p-8 flex flex-col justify-between min-h-[500px] transition-all duration-500 ${comanda ? 'border-emerald-500 ring-8 ring-emerald-500/5' : 'border-slate-100'}`}>
          {comanda ? (
            <div className="animate-in fade-in zoom-in duration-500">
              <div className="flex justify-between items-start border-b border-slate-50 pb-6 mb-6">
                <div>
                  <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">Mesa {comanda.mesa?.numero_mesa || 'N/A'}</h2>
                  <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mt-1">Folio #{comanda.id_comanda}</p>
                </div>
                <div className={pagado ? "bg-emerald-500 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest" : "bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest"}>
                  {pagado ? "PAGADO" : "PENDIENTE"}
                </div>
              </div>

              <div className="space-y-3 mb-8 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                {comanda.detalles?.map((d: any) => (
                  <div key={d.id_detalle} className="flex justify-between text-sm font-medium text-slate-600 border-b border-slate-50 pb-2">
                    <span>{d.cantidad}x {d.producto.nombre}</span>
                    <span className="font-bold text-slate-900">${(Number(d.producto.precio) * d.cantidad).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="bg-slate-900 text-white p-8 rounded-[2rem] mb-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><ArrowUpRight size={80}/></div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-2">Total a Liquidar</p>
                <h3 className="text-5xl font-black tracking-tighter">${Number(comanda.total).toFixed(2)}</h3>
              </div>

              {!pagoExitoso ? (
                <button onClick={handleCobrar} disabled={loading || pagado} className={`w-full py-6 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${pagado ? 'bg-slate-100 text-slate-400' : 'bg-emerald-500 text-white hover:bg-emerald-600 hover:scale-[1.01] shadow-xl shadow-emerald-200'} disabled:opacity-50`}>
                  {loading ? <Loader2 className="animate-spin" /> : <><CheckCircle2 size={24} /> Registrar Pago</>}
                </button>
              ) : (
                <div className="space-y-4 animate-in slide-in-from-bottom-4">
                  <div className="bg-emerald-50 p-6 rounded-3xl border-2 border-emerald-100">
                    <label className="text-[10px] font-black text-emerald-700 uppercase mb-3 block tracking-widest text-center">Ticket Digital enviado</label>
                    <div className="flex gap-2">
                      <input type="tel" placeholder="WhatsApp..." value={telefono} onChange={(e) => setTelefono(e.target.value)} className="flex-1 bg-white px-5 py-4 rounded-2xl font-bold border-2 border-emerald-200 outline-none" />
                      <a href={getWhatsAppFinalLink()} target="_blank" className={`p-4 rounded-2xl flex items-center justify-center transition-all ${telefono.length >= 10 ? 'bg-[#25D366] text-white shadow-lg' : 'bg-slate-200 text-slate-400 pointer-events-none'}`}><MessageCircle fill="white" /></a>
                    </div>
                  </div>
                  <button onClick={resetCaja} className="w-full text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-900 py-4 transition-colors">Siguiente Cliente →</button>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-200 space-y-6 py-24">
              <div className="p-12 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-100"><Search size={64} /></div>
              <p className="font-black text-[12px] uppercase tracking-[0.4em] text-center leading-relaxed">Listo para escanear</p>
            </div>
          )}
          {error && <div className="mt-4 p-4 bg-red-50 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 border border-red-100 animate-bounce"><XCircle size={14}/> {error}</div>}
        </section>
      </main>
    </div>
  );
}