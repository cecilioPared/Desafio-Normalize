
import DB from './index.js'
import { Schema } from 'mongoose'


export default class Mensajes extends DB {
    constructor() {     
        super('Mensaje', new Schema({            
            author: { type: Object, required: true },
            text: { type: String, required: true },            
            fecha: {type: String, require: true },
            fechaAuditoria: {type: Date},
        }))
    }
}

