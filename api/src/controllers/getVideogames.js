const { Videogame, Genre } = require('../db');
const axios = require('axios');
const { Op } = require('sequelize');
const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

const getApiInfo = async function () {
  let gamesData = [];

  for (let i = 1; i < 6; i++) {
    gamesData.push(axios.get(`${API_URL}/games?key=${API_KEY}&page=${i}`));
  }

  return Promise.all(gamesData).then(response => {
    let pages = [];
    let resultado = [];

    for (let i = 0; i < response.length; i++) {
      pages = [...pages, response[i].data.results];
    }

    pages.map(p => {
      p.forEach(v => {
        resultado.push({
          id: v.id,
          name: v.name,
          image: v.background_image,
          rating: v.rating.toFixed(2),
          genres: v.genres.map(g => g.name),
          screenshots: v.short_screenshots,
        });
      });
    });

    return resultado;
  });
};

const getDbInfo = async function () {
  let dbInfo = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });

  dbInfo = JSON.parse(JSON.stringify(dbInfo));
  dbInfoModif = dbInfo.reverse();

  return dbInfoModif.map(videogame => {
    videogame.genres = videogame.genres.map(g => g.name);
    return videogame;
  });
};

const getAllVideogames = async function () {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = dbInfo.concat(apiInfo);
  return infoTotal;
};

const getApiInfoByName = async function (name) {
  let gamesData = [];

  const urlData = await axios.get(`${API_URL}/games?search=${name}&key=${API_KEY}`);
  urlData.data.results.forEach(v => {
    if (gamesData.length < 15) {
      gamesData.push({
        id: v.id,
        name: v.name,
        description: v.description,
        image: v.background_image,
        released: v.released,
        rating: v.rating.toFixed(2),
        platforms: Array.isArray(v.platforms) ? v.platforms.map(p => p.platform.name) : "Unspecified platform",
        genres: v.genres.map(g => g.name),
        screenshots: v.short_screenshots,
      });
    }
  });

  return gamesData;
};

const getDbInfoByName = async function (name) {
  let videoGames = await Videogame.findAll({
    where: {
      name: {
        [Op.iLike]: '%' + name + '%',
      },
    },
    include: {
      model: Genre,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });

  videoGames = JSON.parse(JSON.stringify(videoGames));
  videoGames = videoGames.reverse();

  return videoGames.map(videoGame => {
    videoGame.genres = videoGame.genres.map(g => g.name);
    return videoGame;
  });
};

const getAllVideogamesByName = async function (name) {
  const dbResults = await getDbInfoByName(name);
  const apiResults = await getApiInfoByName(name);
  const allResults = dbResults.concat(apiResults);
  return allResults.slice(0, 15);
};

const getVideogames = async function (req, res) {
  try {
    const { name } = req.query;
  
    if (name) {
      let videogamesByName = await getAllVideogamesByName(name);
  
      if (videogamesByName.length <= 0) {
        res.status(404).json({error:'No results'});
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