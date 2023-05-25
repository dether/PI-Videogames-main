const { Genre } = require("../db");
const axios = require("axios");
const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

const getGenres = async function (req, res) {
  try {
    let gamesData = [];

    const urlData = await axios.get(
      `${API_URL}/genres?key=${API_KEY}`
    );

    urlData.data.results.forEach(v => {
      gamesData.push({
        id: v.id,
        name: v.name,
      });
    });

    gamesData.forEach(async el => {
      await Genre.findOrCreate({
        where: {
          id: el.id,
          name: el.name,
        },
      });
    });

    const getDbInfoGenres = await Genre.findAll();

    res.send(getDbInfoGenres);
    
  } catch (error) {
    /* console.error("Error:", error); */
    res.status(500).send("Internal Server Error");
  }
};

module.exports = getGenres
