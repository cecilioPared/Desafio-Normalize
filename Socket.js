import { Server } from 'socket.io'
import Mensajes from './db/mensajes.js'
import { Normalize } from './utils/normalized.js'
let io


export function initSocket(httpServer) {
  io = new Server(httpServer)
  setEvents(io)
}

async function setEvents(io) {

  const mensajeDB = new Mensajes();

  io.on('connection', async (socketClient) => {
    console.log('Se conecto un nuevo cliente con el id', socketClient.id)
    const mensajesDB = await mensajeDB.obtener()
    const mensajeNorm = await Normalize(mensajesDB)
    
    console.log('RESULT',JSON.stringify(mensajeNorm) )

    socketClient.emit('historial', mensajeNorm)
    
    socketClient.on('nuevo-mensaje', async (data) => {              
      console.log('nuevo mensaje',data);
      await mensajeDB.crear(data);
     
     const mensajesDB = await mensajeDB.obtener()
     const mensajeNorm = await Normalize(mensajesDB)
     io.emit('historial', mensajeNorm);
    })

    socketClient.on('disconection', () => {
      console.log('Se desconecto el cliente con el id', socketClient.id)
    })
  })
}
