//delete
const dataContainer = document.getElementById('data-container');
const messageContainer = document.getElementById('message-container');

async function deleteProduct(id) {
  try {
    const response = await fetch(`http://localhost:3000/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return true;  // Indicar que la eliminación fue exitosa
    } else {
      console.error(`Error al eliminar producto con ID ${id}.`);
      return false; // Indicar que hubo un error en la eliminación
    }
  } catch (error) {
    console.error('Error al realizar la solicitud DELETE:', error);
    return false; // Indicar que hubo un error en la eliminación
  }
}

async function getData() {
  try {
    dataContainer.innerHTML = '';
    messageContainer.innerHTML = '';

    const response = await fetch('http://localhost:3000');
    const products = await response.json();

    if (products.length <= 0) {
      alert('No hay productos para eliminar.');
      return;
    }

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Agregar encabezados
    const headerRow = document.createElement('tr');
    ['Nombre', 'Marca', 'Acciones'].forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    products.forEach(product => {
      const row = document.createElement('tr');

      const productData = [product.nombre, product.marca];

      productData.forEach(data => {
        const td = document.createElement('td');
        td.textContent = data;
        row.appendChild(td);
      });

      const tdActions = document.createElement('td');

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Eliminar';
      deleteBtn.addEventListener('click', async () => {
        try {
          const confirmDelete = confirm(`¿Seguro que quieres eliminar el producto con ID ${product.id}?`);

          if (confirmDelete) {
            const deletionSuccessful = await deleteProduct(product.id);

            if (deletionSuccessful) {
              await getData();
              showSuccessMessage(`Producto eliminado correctamente.`);
            } else {
              showErrorMessage(`Error al eliminar el producto.`);
            }
          }
        } catch (error) {
          console.error('Error al eliminar producto:', error);
        }
      });

      tdActions.appendChild(deleteBtn);
      row.appendChild(tdActions);

      tbody.appendChild(row);
    });

    table.appendChild(thead);  // Agregar thead a la tabla
    table.appendChild(tbody);
    dataContainer.appendChild(table);

    // Agregar salto de línea
    dataContainer.appendChild(document.createElement('br'));
    dataContainer.appendChild(document.createElement('br'));
    dataContainer.appendChild(document.createElement('br'));
    dataContainer.appendChild(document.createElement('br'));
    dataContainer.appendChild(document.createElement('br'));
    dataContainer.appendChild(document.createElement('br'));
  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
}

function showSuccessMessage(message) {
  const successMessage = document.createElement('div');
  successMessage.textContent = message;
  successMessage.classList.add('texto_g');
  messageContainer.appendChild(successMessage);
}

function showErrorMessage(message) {
  const errorMessage = document.createElement('div');
  errorMessage.textContent = message;
  errorMessage.classList.add('texto_r');
  messageContainer.appendChild(errorMessage);
}

window.onload = getData;

const deleteButton = document.getElementById('delete-button');
deleteButton.addEventListener('click', getData);

