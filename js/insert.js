// Manejar el envío del formulario
const form = document.getElementById('formulario');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;

  const userData = {
    nombre: nombre,
    apellido: apellido
  };

  // Enviar la solicitud POST al servidor
  fetch('http://localhost:3000/usuarios', {
    method: 'POST',
    body: JSON.stringify(userData),
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
