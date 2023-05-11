const { Videogame, Genre } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");
const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

const getVideogamesByName = async (req, res) => {
  const { name } = req.query;
  let videogames = [];

  try {
    if (name) {
      // Búsqueda en la base de datos
      const dbVideogames = await Videogame.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: [Genre],
      });
      videogames = [...videogames, ...dbVideogames];

      // Busca en la API
      const apiResponse = await axios.get(`${API_URL}/games?key=${API_KEY}&search=${name}`);
      const apiVideogames = apiResponse.data.results.filter(
        (game) => game.name.toLowerCase().includes(name.toLowerCase())
      );

      videogames = [...videogames, ...apiVideogames];

      // Manejo de errores
      if (videogames.length === 0) {
        return res.status(404).json({
          message: `No games found with the name "${name}"`,
        });
      }
      return res.status(200).json(videogames);
    } else {
      return res.status(400).json({
        message: "You must provide a game name to search",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while searching for videogames",
    });
  }
};

module.exports = getVideogamesByName;
