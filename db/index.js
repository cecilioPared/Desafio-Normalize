import mongoose from 'mongoose'

await mongoose.connect('mongodb+srv://developer:xKC5-!M2BngHsNg@cluster0.lwkvzm9.mongodb.net/normalize?retryWrites=true&w=majority')

class DB {
    constructor(modelName,schema){
        this.collection = mongoose.model(modelName, schema)
    }

    async obtener(query = {}) {
        const criterio = query
        try {
            const cursor = await this.collection.find(criterio)            
            const result = []
            cursor.forEach((obj) => {
              result.push(obj)
            })
            return result
        } catch (error) {
            throw new Error(error.message)      
        }  
    }

    async crear(obj){
        try {
            const result = await this.collection.create(obj)
            return result
        } catch (error) {
            throw new Error(error.message)      
        }  
    }
}

export default DB