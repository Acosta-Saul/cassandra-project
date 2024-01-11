async function getData() {
  // Inicia una solicitud a la URL donde están los datos
  const response = await fetch('http://localhost:3000');
  const data = await response.json();

  // Obtengo el id del div.container_data y lo guardo en una variable
  const container_data = document.getElementById('data-container');
  
  // Limpiar el contenido de container_data
  container_data.innerHTML = '';

  const disable = document.getElementById('formulario');
  if (disable.style.display != 'none') {
    disable.style.display = 'none';
  }

  const filter_container = document.getElementById('filter-container');
  if (filter_container.style.display != 'none') {
    filter_container.style.display = 'none';
  }

  const form = document.getElementById('formulario-update');
  if (form.style.display != 'none') {
    form.style.display = 'none';
  }

  // Si data es mayor que > 0 (data es un array de datos) significa que vienen datos
  if (data.length > 0) {
    // Crea la tabla en el HTML (No se va a ver en el index.html, solo se muestra en la página web,
    // pueden ver la tabla dando click derecho en la página, inspeccionar, revisan body, container, div.data-container,
    // ahí está la tabla que se está creando aquí)
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Creo un array con los campos que quiero colocar en la tabla que voy a crear y los datos que quiero mostrar en dicha tabla
    const campos = ['nombre', 'marca', 'unidades', 'promocion', 'rango_etario', 'genero', 'creditos', 'fecha_vencimiento'];

    // Crear la fila de encabezado (cabecera) basado en los campos del registro de Cassandra
    // (los campos de la tabla, esto se muestra en la página igual que la tabla, no en el archivo index.html)
    const headerRow = document.createElement('tr');
    
    // Itera sobre los campos definidos para crear los th
    campos.forEach(campo => {
      if (campo !== 'id') { // Evitar mostrar la columna de ID en la tabla
        const th = document.createElement('th');
        th.textContent = campo;
        headerRow.appendChild(th);
      }
    });
    thead.appendChild(headerRow);

    // Agregar la cabecera a la tabla
    table.appendChild(thead);

    // Crear filas de datos
    data.forEach(item => {
      const row = document.createElement('tr');
      
      // Campos que quiero mostrar en la tabla, item[campo] va a extraer el contenido de la tabla,
      // ejemplo item[nombre], me dará el nombre del registro y lo almacenará en el td.textContent,
      // luego ese td se guarda como hijo del row con el appendChild (Esto es cosa de JavaScript)
      campos.forEach(campo => {
        if (campo !== 'id') { // Evitar mostrar la columna de ID en la tabla
          const td = document.createElement('td');
          td.textContent = (item[campo]);
          row.appendChild(td);
        }
      });
      tbody.appendChild(row);
    });

    // Agregar filas de datos al cuerpo de la tabla
    table.appendChild(tbody);

    // Agregar la tabla al contenedor
    container_data.appendChild(table);

    // Agregar saltos de línea adicionales
    container_data.appendChild(document.createElement('br'));
    container_data.appendChild(document.createElement('br'));
    container_data.appendChild(document.createElement('br'));
    container_data.appendChild(document.createElement('br'));
    container_data.appendChild(document.createElement('br'));
    container_data.appendChild(document.createElement('br'));
  } else {
    // Si no hay datos, mostrar un mensaje en el contenedor
    container_data.textContent = 'No hay datos disponibles.';
  }
}

// Llamar a la función para obtener y mostrar los datos
const fetchButton = document.getElementById('read-button');
fetchButton.addEventListener('click', getData);
