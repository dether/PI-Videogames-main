const { Router } = require('express');

const getVideogames = require('../controllers/getVideogames');
const getVideogameById = require('../controllers/getVideogameById');
const postVideogame = require('../controllers/postVideogame');
const getGenres = require("../controllers/getGenres");
const deleteVideogame = require("../controllers/deleteVideogame");

const router = Router();

// GET
router.get('/videogames', getVideogames);
router.get('/videogames/:id', deleteVideogame);
router.get('/videogame/:id', getVideogameById);
router.get("/genres", getGenres);
// POST
router.post('/videogames', postVideogame);

module.exports = router;
