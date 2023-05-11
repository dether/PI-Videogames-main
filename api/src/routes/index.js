const { Router } = require('express');
const  getVideogames = require("../controllers/getVideogames");
const  getVideogamesById = require("../controllers/getVideogamesById");
const addVideoGame = require("../controllers/AddVideogame");
const getVideogamesByName = require("../controllers/getVideogamesByName");
const getGenres = require("../controllers/getGenres");


const router = Router();
router.get("/videogames",getVideogames);
router.get("/videogames/search", getVideogamesByName);  
router.get("/videogames/:id",getVideogamesById);
router.post("/videogames", addVideoGame);
router.get("/genres", getGenres);
/* router.use("/videogames/:id", getVideogamesById); */


/* router.use("/videogames", characters);
router.use("/genres", favorites); */
/* router.use("/login", login); */

// Configurar los routers   
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
