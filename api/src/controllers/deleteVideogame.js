const { Videogame } = require("../db")
const deleteVideogame = async function(req, res) {
    try {
        const {id} = req.params;
        
        Videogame.destroy({
            where: {
                id: id
            }
        }).then(function(result) {
            if(result) {
                res.status(200).send("Videogame deleted");
            }else{
                res.status(404).send("Videogame not deleted");
            }
        })
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = deleteVideogame;