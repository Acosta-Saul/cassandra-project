
function mostrarDatos(){
  const seleccion = document.getElementById('opciones').value;
  
  console.log(seleccion);

//Funcion para mostrar los rangos disponibles para filtar
    function mostrarSelector() {
      const opciones = document.getElementById('opciones');
      const selectorRangoEtario = document.getElementById('selectorRangoEtario');
    
      if (opciones.value === 'opcion3') {
        selectorRangoEtario.style.display = 'block';
      } else {
        selectorRangoEtario.style.display = 'none';
      }
    }
    
// Ejecuta el código correspondiente a la opción 'opcion3'
    if (seleccion === 'opcion3') {

mostrarSelector();

fetch('http://localhost:3000/promedio_Etario', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => {
  if (!response.ok) {
    throw new Error('No se pudo obtener los datos');
  }
  return response.json();
})
.then(data => {
  // Aquí recibes los datos del servidor
  console.log('Datos de rango etario y créditos:', data);
  
  // Obtener el valor del rango seleccionado del formulario
// Obtener el valor del rango seleccionado del formulario
const rangoSeleccionado = document.getElementById('rangoEtario').value; // Suponiendo que el ID del select es 'rangoEtario'

// Obtener los límites del rango
const [rangoMin, rangoMax] = rangoSeleccionado.split('-').map(Number);

// Filtrar los datos del servidor para encontrar coincidencias dentro del rango seleccionado
const datosCoincidentes = data.filter(item => {
  return item.rango_etario.some(edad => {
    const edadNumerica = parseInt(edad);
    return !isNaN(edadNumerica) && edadNumerica >= rangoMin && edadNumerica <= rangoMax;
  });
});

console.log('Datos coincidentes con el rango seleccionado:', datosCoincidentes);

const mensajeContainer = document.getElementById('message-container');

const tablaExistente = mensajeContainer.querySelector('table');
//Si exite una tabla la elimina para mostrar otra tabla
if (tablaExistente) {
  mensajeContainer.removeChild(tablaExistente);
}

const tablaContainer = document.createElement('table');
const encabezado = tablaContainer.createTHead();
const filaEncabezado = encabezado.insertRow();
const cuerpoTabla = tablaContainer.createTBody();

// Crear encabezado de la tabla
const celdaTitulo = filaEncabezado.insertCell();
celdaTitulo.textContent = 'Rango Etario';
const celdaPromedio = filaEncabezado.insertCell();
celdaPromedio.textContent = 'Promedio de Créditos Entregados';

// Iterar sobre los datos coincidentes para crear las filas de la tabla
datosCoincidentes.forEach(item => {
  const fila = cuerpoTabla.insertRow();
  const celdaRango = fila.insertCell();
  celdaRango.textContent = rangoSeleccionado; // Mostrar el rango seleccionado del formulario
  const celdaPromedio = fila.insertCell();
  
  // Realizar cálculos para obtener el promedio de créditos por cada rango etario
  const creditos = item.creditos.map(Number);
  const sumaCreditos = creditos.reduce((acc, credito) => acc + credito, 0);
  const promedio = creditos.length > 0 ? sumaCreditos / creditos.length : 0;
  celdaPromedio.textContent = Math.round(promedio); // Mostrar el promedio redondeado en la tabla
});

mensajeContainer.appendChild(tablaContainer);
})

.catch(error => {
 console.error('Error al obtener datos desde el servidor:', error);
});

    } else {
      // Ejecuta el código correspondiente a otras opciones
      // Puedes poner aquí otro código que se ejecutará si la opción no es 'opcion3'
    }
  
}