//Importamos el módulo dotenv para cargar las variables de entorno desde el archivo .env
require('dotenv').config();
const { Sequelize } = require('sequelize');
// Importamos el módulo fs para trabajar con el sistema de archivos
const fs = require('fs');
// Importamos el módulo path para manejar rutas de archivos y directorios
const path = require('path');
// Obtenemos las variables de entorno para la conexión a la base de datos
const { DB_USER, DB_PASSWORD, DB_HOST,} = process.env;

// Creamos una instancia de Sequelize para la conexión a la base de datos
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`, {
  logging: false, // Establecemos en false para no imprimir las consultas SQL en la consola
  native: false, // Habilitamos o deshabilitamos el uso de la librería pg-native para mejorar el rendimiento
}); 
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y los agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos, por ejemplo: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Videogame, Genre } = sequelize.models;

// Definimos las relaciones entre los modelos
Videogame.belongsToMany(Genre, { through: 'videogameGenre' });
Genre.belongsToMany(Videogame, { through: 'videogameGenre' });

// Product.hasMany(Reviews);

module.exports = {
  ...sequelize.models, // Exportamos todos los modelos para poder importarlos fácilmente
  conn: sequelize, // Exportamos la conexión a la base de datos
};
