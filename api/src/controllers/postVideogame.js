const { Videogame, Genre } = require("../db");

const postVideogame = async function (req, res) {
  try {
    const { name, description, released, rating, platforms, image, genres } =
    req.body;

  let getDbInfoGenres = await Genre.findAll({
    where: {
      name: genres,
    },
  });

  if (name && description && platforms && rating && platforms && image && released) {
    let newVideogame = await Videogame.create({
      name,
      description,
      released,
      rating,
      platforms,
      image,
    });

    newVideogame.addGenres(getDbInfoGenres);
    return res.status(200).send('Videogame created successfully');
    
  }
  } catch (error) {
    res.status(404).send(error)
  }
};

module.exports = postVideogame;