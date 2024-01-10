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
  function mostrarResultadosOpcion2() {
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
  } else if (seleccion === 'opcion2') {
    try {
      // Obteniendo datos directamente desde la API
      const response = await fetch('http://localhost:3000');
      resultados = await response.json();

      // Mostrar la tabla con los rangos de edad y la cantidad de personas para cada producto para la Opción 2
      mostrarResultadosOpcion2();
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
