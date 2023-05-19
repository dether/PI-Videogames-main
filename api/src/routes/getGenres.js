require("dotenv").config();
const {Genre} = require("../db");
const axios = require("axios");
const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;


// ---------------------- Para traer todos los génerenos desde la api ----------------------------

const getApiInfoGenres = async function() {

    let gamesData = [];

    const urlData = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    urlData.data.results.forEach(v => {
         gamesData.push({
             id: v.id,
             name: v.name,
         })
    })
     
    gamesData.forEach(el => {
        Genre.findOrCreate({
            where: {
                id: el.id,
                name: el.name
            }
        })
   })       
}

// ---------------------- Ruta para traer todos los géneros ----------------------------

module.exports = async function(req, res, next) {
    await getApiInfoGenres();
       
    const getDbInfoGenres = await Genre.findAll();

    res.send(getDbInfoGenres);   
};
