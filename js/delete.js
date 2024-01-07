// delete.js

const dataContainer = document.getElementById('data-container');
const messageContainer = document.getElementById('message-container');

async function deleteUser(id) {
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
      console.error(`Error al eliminar usuario con ID ${id}.`);
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
    const users = await response.json();

    if (users.length <= 0) {
      alert('No hay usuarios para eliminar.');
      return;
    }

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Agregar encabezados
    const headerRow = document.createElement('tr');
    ['ID', 'Nombre', 'Apellido', 'Acciones'].forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    users.forEach(user => {
      const row = document.createElement('tr');

      const userData = [user.id, user.nombre, user.apellido];

      userData.forEach(data => {
        const td = document.createElement('td');
        td.textContent = data;
        row.appendChild(td);
      });

      const tdActions = document.createElement('td');

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Eliminar';
      deleteBtn.addEventListener('click', async () => {
        try {
          const confirmDelete = confirm(`¿Seguro que quieres eliminar al usuario con ID ${user.id}?`);

          if (confirmDelete) {
            const deletionSuccessful = await deleteUser(user.id);

            if (deletionSuccessful) {
              await getData();
              showSuccessMessage(`Usuario eliminado correctamente.`);
            } else {
              showErrorMessage(`Error al eliminar al usuario.`);
            }
          }
        } catch (error) {
          console.error('Error al eliminar usuario:', error);
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
