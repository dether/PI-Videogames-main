const express = require('express'); //para crear el servidor
const cookieParser = require('cookie-parser'); //para manejar cookies en las solicitudes
const bodyParser = require('body-parser'); //para analizar el cuerpo de las solicitudes
const morgan = require('morgan');// para generar registros de solicitudes HTTP
const routes = require('./routes/index.js');

require('./db.js'); // Importamos el archivo de configuración de la base de datos

const server = express(); // Creamos una instancia de servidor utilizando express

server.name = 'API'; // Establecemos el nombre del servidor como 'API'

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));// Configuramos body-parser para analizar los datos codificados en la URL
server.use(bodyParser.json({ limit: '50mb' }));// Configuramos body-parser para analizar los datos JSON en el cuerpo de las solicitudes
server.use(cookieParser());// Configuramos cookie-parser para manejar cookies en las solicitudes
server.use(morgan('dev'));  // Configuramos morgan para generar registros de solicitudes HTTP en modo de desarrollo

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Establecemos el encabezado 'Access-Control-Allow-Origin' para permitir solicitudes desde un dominio específico (actualízalo según tu configuración)
  res.header('Access-Control-Allow-Credentials', 'true');// Establecemos el encabezado 'Access-Control-Allow-Credentials' para permitir el envío de cookies en las solicitudes
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');// Establecemos los encabezados permitidos en las solicitudes
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');// Establecemos los métodos HTTP permitidos en las solicitudes
  next();
});

server.use('/', routes);// Configuramos las rutas del servidor


// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;// Obtenemos el código de estado del error (si está disponible) o establecemos 500 por defecto
  const message = err.message || err;// Obtenemos el mensaje de error (si está disponible) o establecemos el error completo como mensaje
  console.error(err); // Imprimimos el error en la consola
  res.status(status).send(message); // Enviamos la respuesta de error con el código de estado y el mensaje correspondientes
});

// Ruta para manejar solicitudes a rutas no encontradas
server.use("*", (req, res) => {
  res.status(404).json({ error: "Not found"}); // Enviamos una respuesta de error con código 404 y un mensaje indicando que no se encontró la ruta
});
module.exports = server; 
