function mostrarFormulario(){
// Obtengo el id del formulario
const form = document.getElementById('formulario');
// Limpio el data-container para que no muestre ninguna tabla
const container = document.getElementById('data-container');
container.innerHTML ='';

// Si el formulario tiene en su display 'none', entonces cambia a un display block (formulario activado)
if (form.style.display === 'none'){
  form.style.display='block';
// Si no tiene un display 'none' entonces colocalo (formulario desactivado)
}else{
  form.style.display = 'none';
}
}
// Obtengo el id del botón Insert para mostrar el formulario
 const btn = document.getElementById('insert-button');
 btn.addEventListener('click', mostrarFormulario);


//Aquí colocar la inserción de datos del formulario a la Base de Datos
