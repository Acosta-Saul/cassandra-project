// Define el servidor Express
const express = require('express');
const cors = require('cors');
const client = require('./cassandra-config');

const app = express();
const port = 3000;

app.use(cors()); // Habilita CORS

app.get('/', async (req, res) => {
  try {
    const result = await client.execute('SELECT * FROM usuarios'); // Cambia esto con tu consulta y tabla
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener datos de Cassandra');
  }
});

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});