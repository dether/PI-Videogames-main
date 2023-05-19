const { Router } = require('express');

const { videoGamesRoute, deleteVideoGameRoute } = require('./getVideogames');
const { videoGameByIdRoute, createVideoGameRoute } = require('./getVideogame');
const genresRoute = require('./getGenres');

const router = Router();

// GET
router.get('/videogames', videoGamesRoute);
router.get('/videogames/:id', deleteVideoGameRoute);
router.get('/videogame/:id', videoGameByIdRoute);
router.get('/genres', genresRoute);
// POST
router.post('/videogames', createVideoGameRoute);

module.exports = router;
