require("dotenv").config();
const URL = process.env.API_URL;
const axios = require("axios");
const API = process.env.API_KEY; 

const getVideogamesById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${URL}/games/${id}?key=${API}`);
    let {
      name,
      description,
      parent_platforms,
      background_image,
      released,
      rating,
      genres,
    } = response.data;
    
    if (id) {
      let game = {
        id: id,
        name: name,
        description:
        description.length < 1200
            ? description
            : description.substring(0, 1200) + " ...",
        parent_platforms: parent_platforms.map((p) => p.platform.name)
        .filter((p) => p != null)
        .join(", "),
        background_image,
        released,
        rating,
        genres:
        genres &&
        genres
            .map((g) => g.name)
            .filter((g) => g != null)
            .join(", "),
      };
      return res.status(200).json(game);
    } else return res.status(400).json("Game not found");
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = getVideogamesById;


/* try {
  const { id } = req.params;
  const response = await axios.get(`${URL}/games/${id}?key=${API}`);
  const {
    name,
    description,
    parent_platforms,
    background_image,
    released,
    rating,
    genres,
  } = response.data;
  
  if (id) {
    const game = {
      id,
      name,
      description,
      parent_platforms,
      background_image,
      released,
      rating,
      genres,
    };
    return res.status(200).json(game);
  } else return res.status(400).json("Game not found");
} catch (error) {
  return res.status(400).send(error);
} */