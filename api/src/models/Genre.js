const { DataTypes } = require('sequelize');
// Exportamos una función que define el modelo y le inyecta la conexión a Sequelize.
module.exports = (sequelize) => {
  // Definimos el modelo 'genre' en la base de datos.
  sequelize.define('genre', {
    name: {
      type: DataTypes.STRING, // El tipo de dato es una cadena de texto.
      allowNull: true,
    },
  },
  {
    timestamps: false // Desactivamos la creación automática de timestamps (createdAt y updatedAt).
  });
};