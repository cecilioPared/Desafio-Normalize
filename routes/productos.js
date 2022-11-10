import { Router } from 'express'
import  Producto from '../Models/productos.js'

const instance = new Producto()

const router = Router()

router.get('/', (req, res, next) => {
  try {    
    const productos = instance.listarAll()    
    const data = {
        productos,
        isEmpty: productos.length
    }
    res.render("productos", data)        

  } catch (error) {
    console.log('ocurrio un error:' , error.message)
    next(error)
  }
})


export default router