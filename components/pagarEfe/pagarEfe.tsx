import { QRCodeSVG } from 'qrcode.react';

// Componente para el cliente
export function ModalPagoEfectivo({ comanda, token }) {
  // El valor del QR puede ser el ID o una URL interna para el cajero
  const qrValue = JSON.stringify({
    id: comanda.id_comanda,
    mesa: comanda.id_mesa,
    token: token
  });

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-3xl shadow-xl">
      <h2 className="text-2xl font-black text-(--militar-green) mb-4 uppercase">Pago en Caja</h2>
      <p className="text-xs font-bold text-gray-400 mb-6 text-center">Muestra este código al cajero para finalizar tu orden</p>
      
      <div className="p-4 bg-white border-4 border-(--light-green) rounded-2xl">
        <QRCodeSVG value={qrValue} size={200} />
      </div>
      
      <div className="mt-6 text-center font-black text-(--militar-green)">
        <span className="block text-[10px] text-gray-400">TOTAL A PAGAR</span>
        <span className="text-3xl">${comanda.total.toFixed(2)}</span>
      </div>
    </div>
  );
}