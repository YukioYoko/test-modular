'use client'
import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { confirmarPagoCaja, buscarComandaParaCobro } from './action';
import { CheckCircle2, Search, Camera, XCircle, Loader2, MessageCircle, Phone } from 'lucide-react';
import { io, Socket } from 'socket.io-client';
import {  useRef } from "react";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

export default function CajaClient() {
  const [comanda, setComanda] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [pagado, setPagado] = useState(false); // Estado de la BD
  const [pagoExitoso, setPagoExitoso] = useState(false); // Éxito de la transacción actual
  const [waLinkBase, setWaLinkBase] = useState(""); 
  const [telefono, setTelefono] = useState(""); 
  const [error, setError] = useState("");
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
        setPagado(res.pagado); // Sincronizamos si ya fue pagada antes
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
      socketRef.current = io(SOCKET_URL, { transports: ["websocket"] });
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
    window.location.reload(); 
  };

  const getWhatsAppFinalLink = () => {
    if (!waLinkBase) return "#";
    const numLimpio = telefono.replace(/\D/g, '');
    const prefix = numLimpio.startsWith('52') ? '' : '52';
    return `${waLinkBase.replace('https://wa.me/?text=', `https://wa.me/${prefix}${numLimpio}?text=`)}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900">
      <header className="max-w-6xl mx-auto mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic text-slate-900">
            Foodlify<span className="text-emerald-500">.POS</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Terminal de Cobro v2.0</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="space-y-6">
          <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="flex items-center gap-2 mb-4 text-slate-400 font-bold text-xs uppercase italic text-center justify-center">
              <Camera size={16} /> Escanear QR del Cliente
            </div>
            <div id="reader" className="rounded-2xl overflow-hidden border-0 bg-slate-100 min-h-[300px]"></div>
            
            <div className="mt-6 flex gap-2">
              <input 
                type="number" 
                placeholder="ID Manual..." 
                className="flex-1 bg-slate-100 p-4 rounded-xl font-bold border-none focus:ring-2 focus:ring-emerald-500 outline-none"
                onKeyDown={(e) => e.key === 'Enter' && handleBuscar(parseInt(e.currentTarget.value))}
              />
              <button 
                onClick={() => {
                    const input = document.querySelector('input[type="number"]') as HTMLInputElement;
                    handleBuscar(parseInt(input.value));
                }}
                className="bg-slate-900 text-white p-4 rounded-xl hover:bg-emerald-600 transition-colors"
              >
                <Search size={20} />
              </button>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8 flex flex-col justify-between min-h-[500px]">
          {comanda ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-start border-b border-slate-50 pb-6 mb-6">
                <div>
                  <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Mesa {comanda.mesa?.numero_mesa || 'N/A'}</h2>
                  <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mt-1">Folio #{comanda.id_comanda}</p>
                </div>
                <div className="text-right text-[10px] font-bold text-slate-400 uppercase">
                  <p>Estado</p>
                  <p className={pagado ? "text-emerald-500" : "text-orange-500"}>
                    {pagado ? "LIQUIDADA" : "PENDIENTE"}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-8 max-h-[150px] overflow-y-auto pr-2">
                {comanda.detalles?.map((d: any) => (
                  <div key={d.id_detalle} className="flex justify-between text-sm font-medium text-slate-600 border-b border-slate-50 pb-2">
                    <span>{d.cantidad}x {d.producto.nombre}</span>
                    <span className="font-bold text-slate-900">${(Number(d.producto.precio) * d.cantidad).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="bg-slate-900 text-white p-6 rounded-[1.5rem] mb-6 shadow-inner">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Total de la cuenta</p>
                <h3 className="text-4xl font-black">${Number(comanda.total).toFixed(2)}</h3>
              </div>

              {!pagoExitoso ? (
                <button 
                  onClick={handleCobrar} 
                  disabled={loading || pagado}
                  className={`w-full py-6 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-lg 
                    ${pagado 
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200' 
                      : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-100'
                    } disabled:opacity-50`}
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : pagado ? (
                    <> <CheckCircle2 size={20} /> Cuenta Liquidada </>
                  ) : (
                    <> <CheckCircle2 size={20} /> Registrar Pago y Liberar Mesa </>
                  )}
                </button>
              ) : (
                <div className="space-y-4 animate-in zoom-in duration-300">
                  <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                    <label className="text-[10px] font-black text-emerald-700 uppercase mb-2 block tracking-widest">Enviar Ticket por WhatsApp</label>
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" size={16} />
                            <input 
                                type="tel" 
                                placeholder="Teléfono del cliente"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                className="w-full bg-white pl-10 pr-4 py-3 rounded-xl font-bold text-sm border-2 border-emerald-200 focus:border-emerald-500 outline-none transition-all"
                            />
                        </div>
                        <a 
                            href={getWhatsAppFinalLink()} 
                            target="_blank" 
                            className={`p-3 rounded-xl flex items-center justify-center transition-all ${telefono.length >= 10 ? 'bg-[#25D366] text-white shadow-md' : 'bg-slate-200 text-slate-400 pointer-events-none'}`}
                        >
                            <MessageCircle fill={telefono.length >= 10 ? "white" : "currentColor"} />
                        </a>
                    </div>
                  </div>

                  <button 
                    onClick={resetCaja} 
                    className="w-full text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-900 transition-colors pt-2"
                  >
                    Atender Siguiente Cliente →
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-300 space-y-4 py-20">
              <div className="p-8 bg-slate-50 rounded-full animate-pulse border border-slate-100">
                <Search size={48} />
              </div>
              <p className="font-black text-[10px] uppercase tracking-[0.2em] text-center leading-relaxed">
                Escanea el QR de la mesa <br/> o busca por folio manual
              </p>
            </div>
          )}
          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-500 rounded-xl text-center text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 border border-red-100">
              <XCircle size={14}/> {error}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}