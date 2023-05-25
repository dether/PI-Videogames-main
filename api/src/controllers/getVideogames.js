const { Videogame, Genre } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");
const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

// Obtener información de la API externa
const getApiInfo = async function () {
  let gamesData = [];

  //! almacenamos en el array toda la info de la pagina 1 a la pagina 5
  for (let i = 1; i < 6; i++) {
    gamesData.push(axios.get(`${API_URL}/games?key=${API_KEY}&page=${i}`));
  }

  //! retornamos los resultados en una promesa, que cuando finalice la función asincronica
  //! una vez finalizado, procesamos la información
  return Promise.all(gamesData).then((response) => {
    let pages = []; 
    let resultado = [];

    // Agregamos la propiedad data.results al array, de cada página de la API 1->5
    for (let i = 0; i < response.length; i++) {
      pages = [...pages, response[i].data.results];
    }

    // mapeamos y guardamos la información necesaria en el array 
    pages.map(p => {
      p.forEach((v) => {
        resultado.push({
          id: v.id,
          name: v.name,
          image: v.background_image,
          rating: v.rating.toFixed(2),
          genres: v.genres.map((g) => g.name),
          screenshots: v.short_screenshots,
          platform: v.parent_platforms.map((g) => g.platform)
        });
      });
    });

    return resultado;
  });
};

// Obtenemos información de la base de datos
const getDbInfo = async function () {
  //consultamos a la bd de la tabla Videogame, incluyendo a Genre y buscamanos "name"
  let dbInfo = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

// Convertirmos los resultados en formato JSON
  dbInfo = JSON.parse(JSON.stringify(dbInfo));

// Revertirmos el orden de los resultados
  dbInfoModif = dbInfo.reverse();

// Para cada game se mapean los generos asociados
  return dbInfoModif.map((videogame) => {
    videogame.genres = videogame.genres.map((g) => g.name);
    return videogame;
  });
};

// Obtenemos todos los videojuegos (API + base de datos) 
const getAllVideogames = async function () {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();

  // Combinamos los resultados de la API y la base de datos
  const infoTotal = dbInfo.concat(apiInfo);
  return infoTotal;
};

// Obtenemos información de la API externa por nombre -------------------------------------------------------
const getApiInfoByName = async function (name) {
  let gamesData = [];

  const urlData = await axios.get(
    `${API_URL}/games?search=${name}&key=${API_KEY}`
  );

  urlData.data.results.forEach((v) => {
    if (gamesData.length < 15) {
      gamesData.push({
        id: v.id,
        name: v.name,
        description: v.description,
        image: v.background_image,
        released: v.released,
        rating: v.rating.toFixed(2), // 5 = 5.00
        platforms: Array.isArray(v.platforms)
          ? v.platforms.map((p) => p.platform.name)
          : "Unspecified platform",
        genres: v.genres.map((g) => g.name),
        screenshots: v.short_screenshots,
      });
    }
  });

  return gamesData;
};

// Obtenemos información de la base de datos por nombre
const getDbInfoByName = async function (name) {
  let videoGames = await Videogame.findAll({
    where: {
      name: {
        [Op.iLike]: "%" + name + "%",
      },
    },
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

// Convertimos los resultados en formato JSON
  videoGames = JSON.parse(JSON.stringify(videoGames));

// Revertimos el orden de los resultados
  videoGames = videoGames.reverse();

// Para cada game se mapean los generos asociados
  return videoGames.map((videoGame) => {
    videoGame.genres = videoGame.genres.map((g) => g.name);
    return videoGame;
  });
};

// Obtenermos todos los videojuegos por nombre (API + base de datos)
const getAllVideogamesByName = async function (name) {
  const dbResults = await getDbInfoByName(name);
  const apiResults = await getApiInfoByName(name);

  // Combinar los resultados de la API y la base de datos
  const allResults = dbResults.concat(apiResults);
  // Mostramos solamente los primeros 15
  return allResults.slice(0, 15);
};

// Obtener los videojuegos según la consulta(name) -----------------------------------------------------------------
const getVideogames = async function (req, res) {
  try {
    const { name } = req.query;

    if (name) {
      let videogamesByName = await getAllVideogamesByName(name);

      if (videogamesByName.length <= 0) {
        res.status(404).json({ error: "No results" });
      } else {
        res.status(200).json(videogamesByName);
      }
    } else {
      let videogames = await getAllVideogames();
      res.status(200).send(videogames);
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = getVideogames;
