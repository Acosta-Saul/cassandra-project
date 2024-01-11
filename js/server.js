const express = require('express');
const cors = require('cors');
const client = require('./cassandra-config');
const cassandra = require('cassandra-driver');
const bodyParser = require('body-parser'); 
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Ruta para obtener todos los productos
app.get('/', async (req, res) => {
  try {
    const result = await client.execute('SELECT * FROM productos');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener datos de Cassandra');
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

app.patch('/update/:id', async (req, res) => {
  const productId = req.params.id;
  const {fecha_vencimiento,marca, nombre,unidades } = req.body;
  
  try {
    const query = 'UPDATE productos SET fecha_vencimiento = ?, marca = ?, nombre = ?, unidades = ? WHERE id = ?';
    await client.execute(query,[fecha_vencimiento, marca, nombre,unidades, productId]);

    res.status(200).send('Producto actualizado exitosamente');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al actualizar el producto');
  }
});


// Ruta para eliminar un producto por ID
app.delete('/delete/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const result = await client.execute('DELETE FROM productos WHERE id = ?', [productId]);

    // Verifica si la eliminación fue exitosa
    if (result.wasApplied()) {
      res.json({ message: `Producto con ID ${productId} eliminado correctamente.` });
    } else {
      res.status(404).json({ error: `Producto con ID ${productId} no encontrado.` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar producto de Cassandra.' });
  }
});

// Endpoint para sacar el promedio en basa a rango Etario
app.get('/promedio_Etario', async (req, res) => {
  try {
    const query = 'SELECT rango_etario, creditos, nombre, marca FROM productos'; // Incluir nombre y marca en la consulta
    const result = await client.execute(query);

    // Extraer los datos de rango_etario, creditos, nombre y marca y manejar las listas
    const datosExtraidos = result.rows.map(row => ({
      rango_etario: row.rango_etario || [], // Manejar valores nulos si es necesario
      creditos: row.creditos || [], // Manejar valores nulos si es necesario
      nombre: row.nombre, // Incluir nombre en los datos extraídos
      marca: row.marca // Incluir marca en los datos extraídos
    }));

    res.json(datosExtraidos);
  } catch (error) {
    console.error('Error al obtener datos desde la base de datos:', error);
    res.status(500).json({ error: 'Error al obtener datos' });
  } 
});
// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
