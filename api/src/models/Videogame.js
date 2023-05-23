const { DataTypes } = require('sequelize');
// Exportamos una función que define el modelo y le inyecta la conexión a Sequelize.
module.exports = (sequelize) => {
  // Definimos el modelo 'videogame' en la base de datos.
  sequelize.define('videogame', {
    id: {
      type: DataTypes.STRING, // El tipo de dato es una cadena de texto.
      defaultValue: function(){return "U" + Date.now()+"u"}, // Valor por defecto generado por una función.
      allowNull: false, // No se permite el valor nulo.
      primaryKey: true // Se define como clave primaria.
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT, // El tipo de dato es un texto largo.
      allowNull: false,
    },
    released: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.DECIMAL, // El tipo de dato es un número decimal.
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING), // El tipo de dato es un array de cadenas de texto.
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,// El tipo de dato es un booleano.
      allowNull: false, 
      defaultValue: true // Valor por defecto establecido como verdadero.
    }
  },
  {
    timestamps: false // Desactivamos la creación automática de timestamps (createdAt y updatedAt).
  });
};