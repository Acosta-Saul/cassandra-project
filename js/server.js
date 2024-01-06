// Define el servidor Express
const express = require('express');
const cors = require('cors');
const client = require('./cassandra-config');
const bodyParse = require('body-parser'); 

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











app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});