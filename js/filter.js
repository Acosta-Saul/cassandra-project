let resultados; // Variable global para almacenar los resultados

async function mostrarDatos() {
  const seleccion = document.getElementById('opciones').value;
  console.log(seleccion);


  
  const dataContainer = document.getElementById('data-container');
  dataContainer.innerHTML = ''; // Limpiamos el contenido anterior

  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  // Creo un array con los campos que quiero colocar en la tabla que voy a crear y los datos que quiero mostrar en dicha tabla
  const camposOpcion1 = ['nombre', 'marca', 'promocion'];
  const camposOpcion2 = ['nombre', 'marca', 'rango_etario'];

  // Función para mostrar resultados en la tabla para la Opción 1
  function mostrarResultadosOpcion1() {
    // Crea la fila de encabezado
    const headerRow = document.createElement('tr');

    // Añadir encabezados específicos de la Opción 1
    camposOpcion1.forEach(campo => {
      const th = document.createElement('th');
      th.textContent = campo;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Crea las filas de datos para la Opción 1
    resultados.forEach((resultado) => {
      const dataRow = document.createElement('tr');

      // Añadir celdas específicas de la Opción 1
      camposOpcion1.forEach(campo => {
        const td = document.createElement('td');
        td.textContent = resultado[campo];
        dataRow.appendChild(td);
      });

      tbody.appendChild(dataRow);
    });

    table.appendChild(tbody);
  }

  // Función para mostrar resultados en la tabla para la Opción 2
  function mostrarResultadosOpcion4() {
    // Crea la fila de encabezado
    const headerRow = document.createElement('tr');

    // Añadir encabezados específicos de la Opción 2
    camposOpcion2.forEach(campo => {
      const th = document.createElement('th');
      th.textContent = campo;
      headerRow.appendChild(th);
    });

    // Añadir encabezados para cada rango de edad
    const opcionesRangoEdad = [
      { desde: 18, hasta: 29 },
      { desde: 30, hasta: 40 },
      { desde: 41, hasta: 50 },
      { desde: 51, hasta: 60 },
      { desde: 61, hasta: 100 }
    ];

    opcionesRangoEdad.forEach(opcion => {
      const th = document.createElement('th');
      th.textContent = `${opcion.desde}-${opcion.hasta}`;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Crea las filas de datos para la Opción 2
    resultados.forEach((resultado) => {
      const dataRow = document.createElement('tr');

      // Añadir celdas específicas de la Opción 2
      camposOpcion2.forEach(campo => {
        const td = document.createElement('td');
        td.textContent = resultado[campo];
        dataRow.appendChild(td);
      });

      // Añadir celdas para cada rango de edad
      opcionesRangoEdad.forEach(opcion => {
        const td = document.createElement('td');
        const cantidadPersonas = resultado['rango_etario'].filter(edad =>
          edad >= opcion.desde && edad <= opcion.hasta
        ).length;
        td.textContent = cantidadPersonas;
        dataRow.appendChild(td);
      });

      tbody.appendChild(dataRow);
    });

    table.appendChild(tbody);
  }


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

  // Lógica para más vendidos por número de compras (promoción)
  if (seleccion === 'opcion1') {
    try {
      // Obteniendo datos directamente desde la API
      const response = await fetch('http://localhost:3000');
      resultados = await response.json();

      // Ordenar productos por número de compras (en orden descendente)
      resultados.sort((a, b) => b['promocion'] - a['promocion']);

      // Mostrar los resultados en la tabla para la Opción 1
      mostrarResultadosOpcion1();
    } catch (error) {
      console.error('Error al obtener datos:', error);
      // Puedes agregar aquí manejo de errores, por ejemplo, mostrar un mensaje de error en el contenedor
      dataContainer.textContent = 'Error al obtener datos.';
    }
  } else if{
    
  }
  else if (seleccion === 'opcion3') {

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
    
        }
  
  
  else if (seleccion === 'opcion4') {
    try {
      // Obteniendo datos directamente desde la API
      const response = await fetch('http://localhost:3000');
      resultados = await response.json();

      // Mostrar la tabla con los rangos de edad y la cantidad de personas para cada producto para la Opción 2
      mostrarResultadosOpcion4();
    } catch (error) {
      console.error('Error al obtener datos:', error);
      // Puedes agregar aquí manejo de errores, por ejemplo, mostrar un mensaje de error en el contenedor
      dataContainer.textContent = 'Error al obtener datos.';
    }
  } else {
    // Otra opción o manejo de errores si es necesario
    console.log('Opción no reconocida');
    // Puedes agregar aquí un mensaje de error o cualquier otra acción que desees
  }

  // Finalmente, agregamos la tabla al contenedor de datos
  dataContainer.appendChild(table);
}
