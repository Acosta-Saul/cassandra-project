
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
  
  // Realizar cálculos con los datos coincidentes, por ejemplo, calcular el promedio de créditos
  let cantidadEdadesCoincidentes = 0;
  let sumaCreditos = 0;

  datosCoincidentes.forEach(item => {
    item.rango_etario.forEach(edad => {
      const edadNumerica = parseInt(edad);
      if (!isNaN(edadNumerica) && edadNumerica >= rangoMin && edadNumerica <= rangoMax) {
        cantidadEdadesCoincidentes++;
        const indice = item.rango_etario.indexOf(edad);
        const credito = parseInt(item.creditos[indice]);
        sumaCreditos += isNaN(credito) ? 0 : credito;
      }
    });
  });

  const promedioCreditos = cantidadEdadesCoincidentes > 0 ? sumaCreditos / cantidadEdadesCoincidentes : 0;
  const promedioRedondeado = Math.round(promedioCreditos);

  const mensajeContainer = document.getElementById('message-container'); 

  if (promedioRedondeado === 0) {
    mensajeContainer.textContent = 'No hay créditos dados en ese rango.';
  } else {
    mensajeContainer.textContent = `Promedio de créditos coincidentes con el rango es: ${promedioRedondeado}`;
  }

})

.catch(error => {
 console.error('Error al obtener datos desde el servidor:', error);
});

    } else {
      // Ejecuta el código correspondiente a otras opciones
      // Puedes poner aquí otro código que se ejecutará si la opción no es 'opcion3'
    }
  
}