// Manejar el envío del formulario
const form = document.getElementById('formulario');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const marca = document.getElementById('marca').value;
  const unidades = document.getElementById('unidades').value.toString();
  const promocion = document.getElementById('promocion').value.toString();
  const edades = document.getElementById('edades').value.split(',').map(item => item.trim());
  const numFem = parseInt(document.getElementById('F').value);
  const numMas = parseInt(document.getElementById('M').value);
  
  const generos = [];
  
  // Llenar el array con la cantidad especificada de mujeres (0)
  for (let i = 0; i < numFem; i++) {
    generos.push(0);
  }
  
  // Llenar el array con la cantidad especificada de hombres (1)
  for (let i = 0; i < numMas; i++) {
    generos.push(1);
  }
  
  // Mezclar el array para obtener una distribución aleatoria
  for (let i = generos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [generos[i], generos[j]] = [generos[j], generos[i]];
  }
  
  console.log(generos); // Esto imprime el array con la distribución de géneros
  

  // Convierte el arreglo de enteros de genero a array tipo String
  const sexo = generos.map(entero => entero.toString());

  const creditos = document.getElementById('creditos').value.split(',').map(item => item.trim());
  const fecha_vencimiento = document.getElementById('fecha_vencimiento').value;
  

  const productoData = {
    nombre: nombre,
    marca: marca,
    unidades: unidades,
    promocion: promocion,
    edades: edades,
    generos: sexo,
    Femenino: numFem,
    Masculino: numMas,
    creditos: creditos,
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
        console.log('Usuario creado exitosamente');
        // Aquí podrías hacer algo después de la inserción exitosa
      } else {
        throw new Error('Error al crear el usuario');
      }
    })
    .catch(error => {
      console.error('Error al crear el usuario:', error);
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

  const disable = document.getElementById('formulario-update');
  if (disable.style.display !== 'none') {
    disable.style.display = 'none';
  }
}


// Obtengo el id del botón Insert para mostrar el formulario
const btn = document.getElementById('insert-button');
btn.addEventListener('click', mostrarFormulario);
