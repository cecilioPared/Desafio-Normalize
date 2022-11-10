
(function () {
    const formChat = document.getElementById('form-chat');
    const inputEmail= document.getElementById('input-email');
    const inputNombre = document.getElementById('input-nombre');
    const inputApellido= document.getElementById('input-apellido');
    const inputEdad= document.getElementById('input-edad');
    const inputAlias = document.getElementById('input-alias');
    const inputAvatar= document.getElementById('input-avatar');
    const inputMensaje = document.getElementById('input-mensaje');
    const titulo = document.getElementById('lblTitulo');


    const listaMensajes = document.getElementById('lista-mensajes');
     
    const socket = io();

 
    formChat.addEventListener('submit', (event) => {     
      event.preventDefault();
      const d = new Date()
      const data = {
        author: {
          email: inputEmail.value,
          nombre: inputNombre.value,
          apellido: inputApellido.value,
          edad: inputEdad.value,
          alias: inputAlias.value,
          avatar: inputAvatar.value,
        },        
        fecha: d.toLocaleString(),
        text: inputMensaje.value,
      };
 
      socket.emit('nuevo-mensaje', data);
      inputMensaje.value = '';
      inputMensaje.focus();
    });
  
    socket.on('connect', () => {
      console.log('Conectados al servidor');
    });
  
    socket.on('historial', async (data) => {    

      const autorScheme = new normalizr.schema.Entity(
        'author',
        {},
        { idAttribute: 'email' }
  );

  const mensajeScheme = new normalizr.schema.Entity('mensaje', {
        author: autorScheme,
  });
  const mensajeTotal = new normalizr.schema.Entity('mensaje', {
        mensaje: [mensajeScheme],
  });
  const dataReversed = normalizr.denormalize(
        data.result,
        mensajeTotal,
        data.entities
  );

  const originalSize = JSON.stringify(dataReversed).length;
  const normalizedSize = JSON.stringify(data).length;
  const resultSata = (normalizedSize * 100) / originalSize;
  let totalTotal = resultSata.toFixed(2);
  console.log(data, normalizedSize);

  console.log(
        '--------------------------------------------------------------------'
  );
  console.log(dataReversed, originalSize);
  titulo.innerText = '';
  console.log(`Porcentaje de compresion: ${totalTotal}%`);
  titulo.innerText = `Porcentaje de compresion: ${totalTotal}%`;
  

//console.log(dataReversed.mensaje)

      listaMensajes.innerText = '';
      fetch("/js/templates/mensajesLayout.hbs")
            .then(template => template.text())
            .then(text => {
                const template = Handlebars.compile(text)
                dataReversed.mensaje.forEach(elem => {
                    const li = document.createElement("li");                    
                    li.innerHTML = template(elem)
                    listaMensajes.appendChild(li)
 
                })      
            })
    });
    
  })();
  