async function mostrarDatos() {

  const seleccion = document.getElementById('opciones').value;
  console.log(seleccion);
  // Inicia una solicitud a la URL donde están los datos
  const response = await fetch('http://localhost:3000');
  const data = await response.json();
  // Obtengo el id del div.container_data y lo guardo en una variable
  const container_data = document.getElementById('data-container');
  // Limpio el contenido del container_data
  container_data.innerHTML = '';




  if (seleccion === "opcion2"){
    
  // Si data es mayor que > 0 (data es un array de datos) significa que vienen datos
  if (data.length > 0) {
    let num_femenino = 0;
    let num_masculino = 0;
    let sum_credito = 0;

// Itera sobre cada registro del array
  for (let i = 0; i < data.length; i++) {

    const array = data[i]['genero'].map(num => parseInt(num, 10));
    const array2 = data[i]['creditos'].map(num => parseInt(num,10));
    
    console.log(array);
    console.log(array2);
  
// Obtiene el numero de personas femeninas de 1 registro
    for (let j = 0; j < array.length; j++) {
      if (array[j] === 0) {
        num_femenino++;
// Obtiene el numero de personas femeninas de 1 registro     
      } else if (array[j] === 1) {
        num_masculino++;
      }
    }
// Obtiene la suma total de creditos de 1 registro
    for (let k = 0; k < array2.length; k++) {
      sum_credito += array2[k];
    }
// Obtiene el promedio según el sexo masculino
    let promedio_credito_masculino = sum_credito  / num_masculino;
// Obtiene el promedio según el sexo femenino
    let promedio_credito_femenino = sum_credito  / num_femenino;
  
    console.log(promedio_credito_femenino);
    console.log(promedio_credito_masculino);
  
    console.log(`En el objeto ${i}:`);

    num_femenino = 0;
    num_masculino = 0
    sum_credito = 0;  
   

    }
    console.log("Numero de personas Femeninas que compraron el producto (0):", num_femenino);
    console.log("Numero de personas masculinas que compraron el producto (1):", num_masculino);
    console.log("Suma de Credito por producto: ", sum_credito);
  }else{
    // Si no hay datos, mostrar un mensaje en el contenedor
    container_data.textContent = 'No hay datos disponibles.';
  }
  }
}