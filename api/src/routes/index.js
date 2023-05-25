const { Router } = require('express');

const getVideogames = require('../controllers/getVideogames');
const getVideogameById = require('../controllers/getVideogameById');
const postVideogame = require('../controllers/postVideogame');
const getGenres = require("../controllers/getGenres");
const deleteVideogame = require("../controllers/deleteVideogame");
const updateVideogame = require("../controllers/updateVideogame")

const router = Router();

//              CRUD
// GET
router.get('/videogames', getVideogames);
router.get('/videogame/:id', getVideogameById);
router.get("/genres", getGenres);

// DELETE
router.delete('/videogames/:id', deleteVideogame);

// POST
router.post('/videogames', postVideogame);

// UPDATE
router.put("/videogames/:id", updateVideogame);

module.exports = router;
