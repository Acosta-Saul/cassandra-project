/// Función para mostrar mensaje de éxito
function showSuccessMessage(message) {
  // Limpiar el contenido previo en messageContainer
  messageContainer.innerHTML = '';

  const successMessage = document.createElement('div');
  successMessage.textContent = message;
  successMessage.classList.add('texto_g');
  messageContainer.appendChild(successMessage);
}

// Función para mostrar mensaje de error
function showErrorMessage(message) {
  // Limpiar el contenido previo en messageContainer
  messageContainer.innerHTML = '';

  const errorMessage = document.createElement('div');
  errorMessage.textContent = message;
  errorMessage.classList.add('texto_r');
  messageContainer.appendChild(errorMessage);
}

// Manejar el envío del formulario
const form = document.getElementById('formulario');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const marca = document.getElementById('marca').value;
  const unidades = document.getElementById('unidades').value.toString();
  const fecha_vencimiento = document.getElementById('fecha_vencimiento').value;

  // Número de personas que compraron el producto
  let promocion = Math.floor(Math.random() * 10) + 1;
  let array_edad = [];
  let array_creditos = [];
  let array_sexo = [];

  // Obtiene un valor entre 18 y 75 años
  for (let index = 0; index < promocion; index++) {
    array_edad[index] = Math.floor(Math.random() * (75 - 18 + 1)) + 18;
  }

  // Arreglo int convertido a Arreglo String
  array_edad = array_edad.map(String);

  // Obtiene un valor entre 1 y 5 como crédito 
  for (let index = 0; index < promocion; index++) {
    array_creditos[index] = Math.floor(Math.random() * 5) + 1;
  }

  array_creditos = array_creditos.map(String);

  for (let index = 0; index < promocion; index++) {
    array_sexo[index] = Math.round(Math.random());
  }

  array_sexo = array_sexo.map(String);

  promocion = promocion.toString();

  const productoData = {
    nombre: nombre,
    marca: marca,
    unidades: unidades,
    promocion: promocion,
    edades: array_edad,
    generos: array_sexo,
    creditos: array_creditos,
    fecha_vencimiento: fecha_vencimiento,
  };

  console.log(productoData);

  // Enviar la solicitud POST al servidor
  fetch('http://localhost:3000/productos', {
      method: 'POST',
      body: JSON.stringify(productoData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        console.log('PRODUCTO INSERTADO EXITOSAMENTE');
        // Mostrar mensaje de éxito
        showSuccessMessage('PRODUCTO INSERTADO EXITOSAMENTE');
        // Limpiar el formulario después de la inserción exitosa
        form.reset();
      } else {
        throw new Error('ERROR AL INSERTAR EL PRODUCTO');
      }
    })
    .catch(error => {
      console.error('ERROR AL INSERTAR EL PRODUCTO:', error);
      // Mostrar mensaje de error
      showErrorMessage('ERROR AL INSERTAR EL PRODUCTO');
      // Manejar el error, mostrar un mensaje al usuario, etc.
    });
});



function mostrarFormulario() {
  const form = document.getElementById('formulario');
  const container = document.getElementById('data-container');
  container.innerHTML = '';

  if (form.style.display === 'none') {
    form.style.display = 'block';
  } else {
    form.style.display = 'none';
  }

  const filter_container = document.getElementById('filter-container');
  if (filter_container.style.display != 'none'){
    filter_container.style.display = 'none';
  }

  const disable = document.getElementById('formulario-update');
  if (disable.style.display !== 'none') {
    disable.style.display = 'none';
  }
}


// Obtengo el id del botón Insert para mostrar el formulario
const btn = document.getElementById('insert-button');
btn.addEventListener('click', mostrarFormulario);
