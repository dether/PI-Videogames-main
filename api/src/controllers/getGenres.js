require("dotenv").config();
const {Genre} = require("../db");
const axios = require("axios");
const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

const getGenres = async (req, res) => {
    try {
        const { data } = await axios.get(`${API_URL}/genres?key=${API_KEY}`);
        //busca y crea en la bd
        data.results.forEach((g) => {
            Genre.findOrCreate({
                where: { name: g.name },
            });
        });
        //busco y ordeno por name
        const genresDB = await Genre.findAll({order: [['name', 'ASC']]});
        res.status(200).json(genresDB);
    } catch (err) {
        res.status(404).json(err);
    }
}
module.exports = getGenres;