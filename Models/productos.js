import { generarProductosFake } from '../utils/generadores.js'
class Producto {
    
    listarAll() {
        let productos = [];
        for (let i = 0; i < 5; i++) {
            productos.push({ id: i, ...generarProductosFake()})
        }

        return [...productos]
    }
}

export default Producto