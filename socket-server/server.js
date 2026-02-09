import express from 'express';
import http from 'http';
import { Server } from "socket.io";
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // Permite tu dominio de Vercel y local para pruebas
    origin: ["https://testfoodlify.vercel.app", "http://localhost:3000","https://test-modular-git-test-yukio-yukio-yokogawas-projects.vercel.app",],
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log(`Conectado: ${socket.id}`);

  // 1. Recibir nuevo pedido (Desde el Cliente/Mesero)
  socket.on('new_order', (data) => {
    console.log('📦 Nuevo pedido recibido');
    io.emit('nuevo_pedido_cocina', data); 
  });

  // 2. Recibir cambio de estatus (Desde la Pantalla de Cocina)
  socket.on("change_status", (data) => {
    console.log('🔄 Estatus actualizado:', data);
    // Notificamos a todos (incluyendo al cliente si lo necesita)
    io.emit("estatus_cambiado", data);
  });

  socket.on('disconnect', () => {
    console.log('Desconectado');
  });
});

// Railway asigna el puerto automáticamente
const PORT = process.env.PORT || 3001;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor de Sockets activo en puerto ${PORT}`);
});