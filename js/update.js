// Función para mostrar mensaje de éxito
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

async function getDataForSelect() {
  const response = await fetch('http://localhost:3000'); // Obtener datos del servidor
  const data = await response.json();

  const select = document.getElementById('select-data');
  select.innerHTML = ''; // Limpiar el select antes de agregar nuevas opciones

  const defaultOption = document.createElement('option');
  defaultOption.value = ''; // Valor de la opción predeterminada
  defaultOption.textContent = 'Seleccione una opción'; // Texto de la opción predeterminada
  defaultOption.disabled = true; // Deshabilitar la opción predeterminada
  defaultOption.selected = true; // Establecer la opción predeterminada como seleccionada
  select.appendChild(defaultOption);

  // Si hay datos disponibles, llenar el select con las opciones de la base de datos
  if (data.length > 0) {
    data.forEach(item => {
      const option = document.createElement('option');
      option.value = item.id; // Asignar el valor del ID del registro
      option.textContent = `${item.nombre} ${item.marca}`; // Asignar el texto a mostrar en la opción
      select.appendChild(option);
    });
  } else {
    // Si no hay datos disponibles, mostrar un mensaje en lugar de las opciones
    const noDataOption = document.createElement('option');
    noDataOption.textContent = 'No hay datos disponibles.';
    select.appendChild(noDataOption);
  }
}

// Llamar a la función para obtener y cargar los datos en el select
const fetchSelectButton = document.getElementById('update-button');
fetchSelectButton.addEventListener('click', getDataForSelect);

// Mostrar formulario
function mostrarFormulario() {
  const filter_container = document.getElementById('filter-container');
  if (filter_container.style.display != 'none') {
    filter_container.style.display = 'none';
  }

  // Obtengo el id del formulario
  const form = document.getElementById('formulario-update');
  // Limpio el data-container para que no muestre ninguna tabla
  const container = document.getElementById('data-container');
  container.innerHTML = '';

  // Si el formulario tiene en su display 'none', entonces cambia a un display block (formulario activado)
  if (form.style.display === 'none') {
    form.style.display = 'block';
  // Si no tiene un display 'none' entonces colócalo (formulario desactivado)
  } else {
    form.style.display = 'none';
  }

  const disable = document.getElementById('formulario');
  if (disable.style.display != 'none') {
    disable.style.display = 'none';
  }
}

const updateButton = document.getElementById('update-button');
updateButton.addEventListener('click', mostrarFormulario);

// Update de los datos a la base de datos
// Función para manejar el envío del formulario
function handleFormSubmit(event) {
  event.preventDefault();

  const select = document.getElementById('select-data');
  const selectedId = select.value;
  const nombre = document.getElementById('update-nombre').value;
  const marca = document.getElementById('update-marca').value;
  const unidades = document.getElementById('update-unidades').value.toString();
  const fecha_vencimiento = document.getElementById('update-fecha_vencimiento').value;

  const productoData = {
    nombre: nombre,
    marca: marca,
    unidades: unidades,
    fecha_vencimiento: fecha_vencimiento,
  };

  console.log(productoData);

  fetch(`http://localhost:3000/update/${selectedId}`, {
    method: 'PATCH',
    body: JSON.stringify(productoData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      console.log('SE HA ACTUALIZADO EL PRODUCTO CORRECTAMENTE');
      // Mostrar mensaje de éxito
      showSuccessMessage('SE HA ACTUALIZADO EL PRODUCTO CORRECTAMENTE');
    } else {
      throw new Error('ERROR AL ACTUALIZAR EL PRODUCTO');
    }
  })
  .catch(error => {
    console.error(error);
    // Mostrar mensaje de error
    showErrorMessage('ERROR AL ACTUALIZAR EL PRODUCTO');
  });
}

const formularioUpdate = document.getElementById('formulario-update');
formularioUpdate.addEventListener('submit', handleFormSubmit);
