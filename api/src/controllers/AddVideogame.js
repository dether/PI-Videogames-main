const { Genre, Videogame } = require("../db");

const addVideogame = async (req, res) => {
  const { name, description, platforms, image, released, rating, genres } =
    req.body;

  if (
    !name ||
    !description ||
    !released ||
    !rating ||
    !genres ||
    !image ||
    !platforms
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  let platformString = platforms.join(", ");
  try {
    let videogameCreated = await Videogame.create({
      name: name,
      description: description,
      platforms: platformString,
      image: image,
      released: released,
      rating: rating,
    });

    for (const g of genres) {
      const genre = await Genre.findOne({ where: { name: g } });
      if (!genre) {
        // Si el género no existe, lo creamos
        const newGenre = await Genre.create({ name: g });
        // Añadimos el nuevo género al videogame
        await videogameCreated.addGenre(newGenre);
      } else {
        // Si el género ya existe, lo añadimos al videogame
        await videogameCreated.addGenre(genre);
      }
    }

    const videogameWithGenres = {
      ...videogameCreated.dataValues,
      genres,
    };

    return res.status(200).json(videogameWithGenres);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while creating the videogame",
    });
  }
};

module.exports = addVideogame;
