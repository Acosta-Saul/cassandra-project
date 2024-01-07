// Define el servidor Express
const express = require('express');
const cors = require('cors');
const client = require('./cassandra-config');
const bodyParser = require('body-parser'); 
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

app.use(cors()); // Habilita CORS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', async (req, res) => {
  try {
    const result = await client.execute('SELECT * FROM usuarios'); // obtiene datos de la BD
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener datos de Cassandra');
  }
});


// Endpoint para insertar un usuario
app.post('/usuarios', async (req, res) => {
  const { nombre, apellido } = req.body;

  const userId = uuidv4(); // Genera un ID único para el usuario

  const query = 'INSERT INTO usuarios (id, nombre, apellido) VALUES (?, ?, ?)';
  
  try {
    // Ejecutar la consulta para insertar el usuario en la base de datos
    await client.execute(query, [userId, nombre, apellido]);
    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (err) {
    console.error('Error al insertar el usuario:', err);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
});




// Endpoint para manejar las actualizaciones de los usuarios
app.patch('/update/:id', async (req, res) => {
  const userId = req.params.id;
  const { nombre, apellido } = req.body;
  
  try {
    const query = 'UPDATE usuarios SET nombre = ?, apellido = ? WHERE id = ?';
    await client.execute(query, [nombre, apellido, userId]);

    res.status(200).send('Usuario actualizado exitosamente');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al actualizar el usuario');
  }
});












app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});