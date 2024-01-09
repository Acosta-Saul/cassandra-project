const express = require('express');
const cors = require('cors');
const client = require('./cassandra-config');
const bodyParser = require('body-parser'); 
const { v4: uuidv4 } = require('uuid');

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

// Endpoint para insertar un usuario
app.post('/productos', async (req, res) => {
  const { nombre, marca,unidades ,promocion ,edades ,generos ,creditos ,fecha_vencimiento } = req.body;

  const Id = uuidv4(); // Genera un ID único para el usuario

  const query = 'INSERT INTO productos (id, nombre, marca,unidades,promocion,rango_etario,genero,creditos,fecha_vencimiento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
  try {
    // Ejecutar la consulta para insertar el usuario en la base de datos
    await client.execute(query, [Id,nombre, marca
      ,unidades
      ,promocion
      ,edades
      ,generos
      ,creditos
      ,fecha_vencimiento]);
    res.status(201).json({ message: 'Producto creado exitosamente' });
  } catch (err) {
    console.error('Error al insertar el Prodcuto:', err);
    res.status(500).json({ error: 'Error al crear el Producto' });
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



// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
