import { faker } from '@faker-js/faker/locale/es_MX'

const { name, internet , commerce } = faker

export function generarProductosFake() {
  return {
    nombre: name.fullName(),
    precio: `$ ${commerce.price()}` ,    
    foto: internet.avatar(),
  }
}