async function mostrarDatos() {
  const seleccion = document.getElementById('opciones').value;
  console.log(seleccion);

  const response = await fetch('http://localhost:3000');
  const data = await response.json();

  const container_data = document.getElementById('data-container');
  container_data.innerHTML = ''; // Limpia el contenido del contenedor



// Opcion para filtrar Promedio de Creditos según el sexo
  if (seleccion === "opcion2") {
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

        let num_femenino = 0;
        let num_masculino = 0;
        let sum_credito = 0;

        for (let j = 0; j < array.length; j++) {
          if (array[j] === 0) {
            num_femenino++;
          } else if (array[j] === 1) {
            num_masculino++;
          }
        }

        for (let k = 0; k < array2.length; k++) {
          sum_credito += array2[k];
        }

        let promedio_credito_masculino = sum_credito / num_masculino;
        let promedio_credito_femenino = sum_credito / num_femenino;

        console.log(`En el objeto ${i}:`);
        console.log("Numero de personas Femeninas que compraron el producto (0):", num_femenino);
        console.log("Numero de personas masculinas que compraron el producto (1):", num_masculino);
        console.log("Suma de Crédito por producto: ", sum_credito);

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
        sum_credito = 0;
      }

      // Agregar la tabla al contenedor
      container_data.appendChild(table);

    } else {
      container_data.textContent = 'No hay datos disponibles.';
    }
  }
}