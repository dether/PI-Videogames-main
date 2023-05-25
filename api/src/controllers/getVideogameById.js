const axios = require("axios");
const { Videogame, Genre } = require("../db");
const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;
require("dotenv").config();

const getApiInfoById = async function (id) {
    const urlData = await axios.get(
      `${API_URL}/games/${id}?key=${API_KEY}`
    );
    const gamesData = {
      id: urlData.data.id,
      name: urlData.data.name,
      description: urlData.data.description_raw,
      image: urlData.data.background_image,
      released: urlData.data.released,
      rating: urlData.data.rating,
      platforms: urlData.data.platforms.map(p => p.platform.name),
      genres: urlData.data.genres.map(g => g.name),
    };

    return gamesData;
  
};

const getDbInfoById = async function (id) {
    let dbInfo = await Videogame.findOne({
      where: {
        id: id,
      },
      include: {
        model: Genre,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      },
    });

    dbInfo = JSON.parse(JSON.stringify(dbInfo));
    dbInfo.genres = dbInfo.genres.map(g => g.name);

    return dbInfo;
};

const getVideogameById = async function (req, res) {
  try {
    const { id } = req.params;

    const getAllVideogamesById = async (id) => {

      if (isNaN(id)) {
          const dbInfoById = await getDbInfoById(id);
          return dbInfoById;
      } else {
          const apiInfoById = await getApiInfoById(id);
          return apiInfoById;
      }
  }

  let videogamesById = await getAllVideogamesById(id);

  if (videogamesById != null) {
    return res.status(200).json(videogamesById);
  } else {
    return res.status(404).json({error:'Id not found'});
  }
  } catch (error) {
    res.status(404).json({message:error});
  }
};


module.exports = getVideogameById;
