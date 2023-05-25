const { Videogame, Genre } = require("../db");

const updateVideogame = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, genres, platforms, rating, released } = req.body;

          // Obtén el género actual del videojuego
          const videogame = await Videogame.findByPk(id, {
            include: Genre // Incluir el modelo Genre para obtener la información del género actual
        });

        if (!videogame) {
            return res.status(404).json({ error: "Videogame not found" });
        }
        // Modifica los atributos del videojuego con los nuevos valores
        await videogame.update({
            name,
            description,
            platforms,
            rating,
            released
        });

        // Verifica si se proporcionó un género en la solicitud
        if (genres && Array.isArray(genres)) {

            // Busca el género en la base de datos
            const existingGenres = await Genre.findAll({ where: { name: genres } });

            if (existingGenres.length !== genres.length) {
                return res.status(404).json({ error: "One or more genres not found" });
            }

            // Obtener los IDs de los géneros existentes
            const genreIds = existingGenres.map((genre) => genre.id);
            
            // Actualizar la relación de géneros del videojuego
            await videogame.setGenres(genreIds);
        }

        res.status(200).json({ response: "Videogame updated" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = updateVideogame;