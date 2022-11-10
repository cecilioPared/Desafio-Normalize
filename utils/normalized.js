import { schema, normalize, denormalize } from 'normalizr';
export const Normalize = async (data) => {
      let inputData = {
            id: 'mensaje',
            mensaje: [],
      };

      data.map((item) => {
        inputData.mensaje.push({
                  id: item._id.toString(),
                  text: item.text,
                  fecha: item.fecha,
                  author: {
                        email: item.author.email,
                        nombre: item.author.nombre,
                        apellido: item.author.apellido,
                        edad: item.author.edad,
                        alias: item.author.alias,
                        avatar: item.author.avatar,
                  },
            });
      });

      const authorScheme = new schema.Entity(
            'author',
            {},
            { idAttribute: 'email' }
      );
      
      const mensajeScheme = new schema.Entity('mensaje', {
            author: authorScheme,
      });
      const mensajeTodos = new schema.Entity('mensaje', {
            mensaje: [mensajeScheme],
      });
      const dataNormalized = normalize(inputData, mensajeTodos);

      return dataNormalized;
};