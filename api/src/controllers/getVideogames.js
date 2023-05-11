const { Videogame, Genre } = require("../db")
const axios = require("axios");
const URL = process.env.API_URL;
const API = process.env.API_KEY; 
require("dotenv").config();
const { Op } = require("sequelize");

const getVideogames = async (req, res) => {
  let apiVideogame = []
  let allVideogame = []

  try {
      const dbVideogame = await Videogame.findAll({
      include: [Genre],
    });
      allVideogame = [...allVideogame, ...dbVideogame];


    const response = await axios.get(`${URL}/games?key=${API}`);
    const games = response.data.results.map(game => ({
      id: game.id,
      name: game.name,
      description: game.description,
      platforms: game.parent_platforms.map((platform) => platform.platform.name),
      image: game.background_image,
      released: game.released,
      rating: game.rating,
      genres: game.genres.map(genre => genre.name),
    }));
    
    apiVideogame = [...apiVideogame, ...games]
    allVideogame = [...allVideogame, ...games]

    res.status(200).json(allVideogame);
  } catch (error) {
    res.status(404).json(error);
  }
};
module.exports = getVideogames
// **********************************************
/* require("dotenv").config();
const URL = process.env.API_URL;
const axios = require("axios");
const API = process.env.API_KEY; 
const { Videogame, Genre } = require("../db")

const getVideogames = async (req, res) => {
  const { name } = req.query
  let apiVideogame = []
  let dbVideogame = []
  let allVideogame = []

  try {
    if (name) {
      dbVideogame = await Videogame.findAll({
          where: { name: name },
          include: [Genre],
      });
      allVideogame = [...allVideogame, ...dbVideogame];
    };


    const response = await axios.get(`${URL}/games?key=${API}`);
    const games = response.data.results.map(game => ({
      id: game.id,
      name: game.name,
      description: game.description,
      platforms: game.parent_platforms.map((platform) => platform.platform.name),
      image: game.background_image,
      released: game.released,
      rating: game.rating,
      genres: game.genres.map(genre => genre.name),
    }));
    
    apiVideogame = [...apiVideogame, ...games]
    allVideogame = [...allVideogame, ...dbVideogame, ...games]

    res.status(200).json(allVideogame);
  } catch (error) {
    res.status(404).json(error);
  }
};
module.exports = getVideogames */

// **************************************************
/* exports.getVideogames = async (req, res) => {
  const { name } = req.query;
  let allVideoGames = []; // almacenará todos los juegos de la api
  let gamesDBFull = []; // almacenará todos los juegos de la bd
  let gamesDB = []; // almacena juegos de la bd
  let nextUrl = URL;
  let findedVideoGames = [];

  try {
    if (name) {
      gamesDB = await Videogame.findAll({
        where: { name: name },
        include: [Genre],
      });
      console.log(gamesDB);

      if (gamesDB.length > 0) {
        gamesDBFull = gamesDB.map((g) => ({
          id: g.dataValues.id,
          name: g.dataValues.name,
          image: g.dataValues.image,
          description: g.dataValues.description,
          platforms: g.platforms,
          genres: g.dataValues.genres
            .map((g) => g.name)
            .filter((p) => p !== null)
            .join(", "),
        }));
      }

      const { data } = await axios.get(
        `${URL}/games?key=${API}&search=${name}`
      );

      findedVideoGames = data.results.map((game) => ({
        id: game.id,
        name: game.name,
        description: game.description,
        platforms:
          game.parent_platforms &&
          game.parent_platforms
            .map((p) => p.platform.name)
            .filter((p) => p != null)
            .join(", "),
        image: game.background_image,
        released: game.released,
        rating: game.rating,
        genres:
          game.genres &&
          game.genres
            .map((g) => g.name)
            .filter((g) => g != null)
            .join(", "),
      }));

      findedVideoGames = gamesDBFull.concat(findedVideoGames);

      if (findedVideoGames.length > 0)
        return res.status(200).json(findedVideoGames.slice(0, 15));
      else return res.status(200).json("No games");
    }

    for (let i = 1; i < 6; i++) {
      const { data } = await axios.get(`${nextUrl}/games?key=${API}&page${i}`);

      nextUrl = data.next;

      const videoGame = data.results.map((game) => {
        return {
          id: game.id,
          name: game.name,
          img: game.background_image,
          platforms:
            game.parent_platforms &&
            game.parent_platforms
              .map((p) => p.platform.name)
              .filter((p) => p != null)
              .join(", "),
          genres:
            game.genres &&
            game.genres
              .map((g) => g.name)
              .filter((g) => g != null)
              .join(", "),
          rating: game.rating,
        };
      });
      allVideoGames = allVideoGames.concat(videoGame);
    }

    gamesDB = await Videogame.findAll({ include: [Genre] });
    gamesDBFull = gamesDB.map((g) => ({
      id: g.dataValues.id,
      name: g.dataValues.name,
      img: g.dataValues.img,
      platforms: g.platforms,
      genres: g.dataValues.genres
        .map((g) => g.name)
        .filter((p) => p != null)
        .join(", "),
    }));
    allVideoGames = allVideoGames.concat(gamesDBFull);

    return res.status(200).json(allVideoGames);
  } catch (error) {
    return res.status(400).send(error);
  }
}; */
// -------------------------------------------------
/* const getVideogames = async (req, res) => {

  try {
    const response = await axios.get(`${URL}games?key=${API}`);
    const games = response.data.results.map(game => ({
      id: game.id,
      name: game.name,
      description: game.description,
      platforms: game.parent_platforms.map((platform) => platform.platform.name),
      image: game.background_image,
      released: game.released,
      rating: game.rating,
      genres: game.genres.map(genre => genre.name),
    }));
    res.status(200).json(games);
  } catch (error) {
    res.status(404).json(error);
  }
};


module.exports = getVideogames
 */
