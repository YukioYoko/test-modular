export const dynamic = 'force-dynamic'
import { getMesas } from './actions';
import HostessClient from './hostess';

export default async function HostessPage() {
  // Esta consulta ocurre en el servidor al cargar la página
  const mesas = await getMesas();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Hostess</h1>
      {/* Pasamos los datos del servidor al cliente */}
      <HostessClient mesasIniciales={mesas} />
    </div>
  );
}