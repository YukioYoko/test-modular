// socket-server/server.js
import express from 'express';
import http from 'http';
import { Server } from "socket.io";
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);

// Configuración de CORS para permitir que tu Next.js se conecte
const io = new Server(server, {
  cors: {
    origin: "https://testfoodlify.vercel.app", // La URL de tu Next.js
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);

  // CORRECCIÓN AQUÍ:
  // Escuchamos "new_order" (que es lo que envía tu MenuClient)
  socket.on('new_order', (data) => {
    console.log('📦 Pedido recibido del Cliente:', data);
    
    // Emitimos "nuevo_pedido_cocina" (que es lo que escucha tu CocinaClient)
    io.emit('nuevo_pedido_cocina', data); 
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });

  socket.on("change_status", (data) => {
    console.log('🔄 Cambio de estatus recibido:', data);
    io.emit("estatus_cambiado", data);
  })
});

server.listen(3001, () => {
  console.log('Servidor de Sockets corriendo en puerto 3001');
});