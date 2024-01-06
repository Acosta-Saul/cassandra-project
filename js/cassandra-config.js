// Utilizar el controlador de Cassandra
const cassandra = require('cassandra-driver');

// Instancia del cliente de Cassandra
const client = new cassandra.Client({
  contactPoints: ['localhost'],  //Conexión al servidor de Cassandra
  localDataCenter: 'datacenter1', //Nombre de conexión al grupo de nodos del Cluster
  keyspace: 'database', //Nombre de la Base de Datos
});

// Exportar cliente
module.exports = client;