import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import { fileURLToPath } from 'url'
import { initSocket } from './Socket.js'
import productosRouter from './routes/productos.js'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname, 'public')));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/productos-test', productosRouter)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: true }));


 
 

const PORT = process.env.NODE_PORT || 3000
const ENV = process.env.NODE_ENV


const server = app.listen(PORT, () => {
    console.log(
      `Servidor http esta escuchando en el puerto ${server.address().port}`
    );
    console.log(`http://localhost:${server.address().port}`);
    console.log(`Environment:${ENV}`);
  });
  
  server.on("error", (error) => console.log(`Error en servidor ${error}`));
  
  initSocket(server)