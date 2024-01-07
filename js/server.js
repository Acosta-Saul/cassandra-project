const express = require('express');
const cors = require('cors');
const client = require('./cassandra-config');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json()); // Middleware para manejar solicitudes DELETE correctamente

// Ruta para obtener todos los usuarios
app.get('/', async (req, res) => {
  try {
    const result = await client.execute('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener datos de Cassandra');
  }
});

// Ruta para eliminar un usuario por ID
app.delete('/delete/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await client.execute('DELETE FROM usuarios WHERE id = ?', [userId]);

    // Verifica si la eliminación fue exitosa
    if (result.wasApplied()) {
      res.json({ message: `Usuario con ID ${userId} eliminado correctamente.` });
    } else {
      res.status(404).json({ error: `Usuario con ID ${userId} no encontrado.` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar usuario de Cassandra.' });
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
