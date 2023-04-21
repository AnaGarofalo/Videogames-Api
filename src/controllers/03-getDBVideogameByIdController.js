const { Videogame, Genre } = require("../db");

const getDBVideogameByIdController = async (idGame) => {
  try {
    const dbVideogame = await Videogame.findByPk(idGame, {
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    const videogame = {
      id: dbVideogame.id,
      name: dbVideogame.name,
      description: dbVideogame.description,
      platforms: dbVideogame.platforms,
      background_image: dbVideogame.background_image,
      released: dbVideogame.released,
      rating: dbVideogame.rating,
      genres: dbVideogame.Genres.map((genre) => genre.name),
    };
    return videogame;
  } catch (error) {
    return false;
  }
};

module.exports = getDBVideogameByIdController;
