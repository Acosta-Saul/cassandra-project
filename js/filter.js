let resultados; // Variable global para almacenar los resultados


function mostrarFilter(){
  const filter_container = document.getElementById('filter-container');
  if (filter_container.style.display == 'none'){
    filter_container.style.display = 'block';
  }else{
    filter_container.style.display = 'none';
  }

  const form = document.getElementById('formulario');
  const container = document.getElementById('data-container');
  container.innerHTML = '';

  if (form.style.display != 'none') {
    form.style.display = 'none';
  }

  const forms = document.getElementById('formulario-update');
    // Limpio el data-container para que no muestre ninguna tabla
    const containers = document.getElementById('data-container');
    containers.innerHTML ='';
    
    // Si el formulario tiene en su display 'none', entonces cambia a un display block (formulario activado)
    if (forms.style.display != 'none'){
      forms.style.display = 'none';
    }
}



const boton = document.getElementById('filter-button');
boton.addEventListener('click', mostrarFilter);


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

  // Lógica para más vendidos por número de compras (promoción)
  if (seleccion === 'opcion1') {

  
    const visibilidad = document.getElementById('message-container');
    visibilidad.textContent='';


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
  } 
  
// Opcion para filtrar Promedio de Creditos según el sexo
  else if (seleccion === "opcion2") {

    const visibilidad = document.getElementById('message-container');
    visibilidad.textContent='';

    const response = await fetch('http://localhost:3000');
    const data = await response.json();

    const container_data = document.getElementById('data-container');
    if (data.length > 0) {
      // Crear la tabla
      const table = document.createElement('table');
      // table.border = '1';

      // Crear el encabezado de la tabla
      const thead = table.createTHead();
      const headerRow = thead.insertRow();
      const headers = ['Productos', 'Promedio Crédito Femenino', 'Promedio Crédito Masculino'];

      headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
      });

      // Agregar datos a la tabla
      const tbody = table.createTBody();

      for (let i = 0; i < data.length; i++) {
        const array = data[i]['genero'].map(num => parseInt(num, 10));
        const array2 = data[i]['creditos'].map(num => parseInt(num, 10));

        console.log(array);
        console.log(array2);

        let num_femenino = 0;
        let num_masculino = 0;
        let sum_credito_masculino = 0;
        let sum_credito_femenino = 0;

        for (let j = 0; j < array.length; j++) {
          if (array[j] === 0) {
            num_femenino++;
            sum_credito_femenino += array2[j];
          } else if (array[j] === 1) {
            num_masculino++;
            sum_credito_masculino += array2[j];
          }
        }

        let promedio_credito_masculino = sum_credito_masculino / num_masculino;
        let promedio_credito_femenino = sum_credito_femenino / num_femenino;

        console.log(`En el objeto ${i}:`);
        console.log("Numero de personas Femeninas que compraron el producto (0):", num_femenino);
        console.log("Numero de personas masculinas que compraron el producto (1):", num_masculino);
        console.log("Suma de Crédito por producto según el sexo masculino: ", sum_credito_masculino);
        console.log("Suma de Crédito por producto según el sexo femenino: ", sum_credito_femenino);

        // Agregar una nueva fila a la tabla con los resultados
        const newRow = tbody.insertRow();
        const indexCell = newRow.insertCell(0);
        const femeninoCell = newRow.insertCell(1);
        const masculinoCell = newRow.insertCell(2);

        indexCell.textContent = data[i]['nombre'];;
        femeninoCell.textContent = promedio_credito_femenino.toFixed(2); // Redondea a 2 decimales
        masculinoCell.textContent = promedio_credito_masculino.toFixed(2);

        num_femenino = 0;
        num_masculino = 0;
        sum_credito_masculino = 0
        sum_credito_femenino = 0;
     
      }

      // Agregar la tabla al contenedor
      container_data.appendChild(table);

    } else {
      container_data.textContent = 'No hay datos disponibles.';
    }
  }
  else if (seleccion === 'opcion3') {

    const visibilidad = document.getElementById('message-container');
    visibilidad.textContent='';
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
      console.log('Datos de rango etario, créditos, nombre y marca:', data);
    
      const mensajeContainer = document.getElementById('message-container');
    
      const tablaExistente = mensajeContainer.querySelector('table');
      // Si existe una tabla, la eliminamos para mostrar otra
      if (tablaExistente) {
        mensajeContainer.removeChild(tablaExistente);
      }
    
      const tablaContainer = document.createElement('table');
      const encabezado = tablaContainer.createTHead();
      const filaEncabezado = encabezado.insertRow();
      const cuerpoTabla = tablaContainer.createTBody();
    
      // Crear encabezado de la tabla
      const encabezados = ['Nombre', 'Marca', '18-29', '30-40', '41-50', '51-60', '61-100'];
      encabezados.forEach(encabezado => {
        const celdaEncabezado = filaEncabezado.insertCell();
        celdaEncabezado.textContent = encabezado;
      });
    
      // Iterar sobre los datos para crear las filas de la tabla
      data.forEach(item => {
        const fila = cuerpoTabla.insertRow();
        const celdaNombre = fila.insertCell();
        celdaNombre.textContent = item.nombre;
        const celdaMarca = fila.insertCell();
        celdaMarca.textContent = item.marca;
    
        const rangos = ['18-29', '30-40', '41-50', '51-60', '61-100'];
        rangos.forEach(rango => {
          const edadesCoincidentes = item.rango_etario.filter(edad => {
            const edadNumerica = parseInt(edad);
            return !isNaN(edadNumerica) && edadNumerica >= parseInt(rango.split('-')[0]) && edadNumerica <= parseInt(rango.split('-')[1]);
          });
    
          let sumaCreditos = 0;
          let cantidadCreditos = 0;
    
          edadesCoincidentes.forEach(edad => {
            const indice = item.rango_etario.indexOf(edad);
            const credito = parseInt(item.creditos[indice]);
            if (!isNaN(credito)) {
              sumaCreditos += credito;
              cantidadCreditos++;
            }
          });
    
          const promedio = cantidadCreditos > 0 ? sumaCreditos / cantidadCreditos : 0;
          const celdaPromedio = fila.insertCell();
          celdaPromedio.textContent = Math.round(promedio); // Mostrar el promedio redondeado en la tabla
        });
      });
    
      mensajeContainer.appendChild(tablaContainer);
    })
    .catch(error => {
      console.error('Error al obtener datos desde el servidor:', error);
    });
    
        }
  
  
  else if (seleccion === 'opcion4') {

  
    const visibilidad = document.getElementById('message-container');
    visibilidad.textContent='';

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
