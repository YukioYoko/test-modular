'use client'
import { useState } from 'react';
import { registrarPagoEfectivo } from '@/app/(clientView)/cuenta/action';
import Cookies from "js-cookie";
import { QRCodeSVG } from 'qrcode.react';

export default function BotonEfectivo({ idComanda, desglose }: { idComanda: number, desglose: any }) {
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // El valor del QR. Nota: desglose.total viene de las props para evitar errores de undefined
    const qrValue = JSON.stringify({
        id: idComanda,
        total: desglose.total,
        // Aquí podrías añadir un timestamp o firma para más seguridad
    });

    const handleIniciarPago = async () => {
        setLoading(true);
        // Registramos en la BD que el cliente intentará pagar en efectivo
        const res = await registrarPagoEfectivo(idComanda, desglose);
        setLoading(false);

        if (res.success) {
            // Si la BD se actualizó, limpiamos carrito y mostramos el QR
            Cookies.remove("foodlify_cart");
            setShowModal(true);
        } else {
            alert(res.message || "Error al procesar la solicitud");
        }
    };

    return (
        <>
            {/* BOTÓN PRINCIPAL */}
            <button
                onClick={handleIniciarPago}
                disabled={loading}
                className="w-full mb-4 bg-slate-900 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-800 transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg"
            >
                <span>X</span>
                {loading ? "Generando Ticket..." : "Pagar en efectivo"}
            </button>

            {/* MODAL DEL QR */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden border border-(--mint-green)">
                        
                        {/* Botón para regresar/cerrar */}
                        <button 
                            onClick={() => setShowModal(false)}
                            className="absolute top-6 left-6 p-2 hover:bg-(--light-green) rounded-full transition-colors text-(--militar-green)"
                        >
                            <span>back</span>
                        </button>

                        <div className="flex flex-col items-center mt-6">
                            
                            <h2 className="text-2xl font-black text-(--militar-green) mb-2 uppercase tracking-tighter text-center">
                                Pago en Caja
                            </h2>
                            <p className="text-[10px] font-bold text-gray-400 mb-8 text-center uppercase tracking-widest leading-tight">
                                Presenta este código al cajero <br /> para liquidar tu cuenta
                            </p>

                            {/* Contenedor del QR */}
                            <div className="p-6 bg-white border-[6px] border-(--light-green) rounded-[2rem] shadow-inner mb-8">
                                <QRCodeSVG 
                                    value={qrValue} 
                                    size={180} 
                                    level="H" // Alta corrección de errores para escaneos rápidos
                                    includeMargin={false}
                                    className="rounded-lg"
                                />
                            </div>

                            {/* Desglose final */}
                            <div className="w-full bg-(--light-green)/30 p-5 rounded-3xl text-center border border-(--mint-green)">
                                <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total a Liquidar</span>
                                <span className="text-4xl font-black text-(--militar-green)">
                                    ${Number(desglose.total).toFixed(2)}
                                </span>
                            </div>

                            <p className="mt-8 text-[9px] font-bold text-gray-300 uppercase text-center italic">
                                ID Comanda: #{idComanda}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}