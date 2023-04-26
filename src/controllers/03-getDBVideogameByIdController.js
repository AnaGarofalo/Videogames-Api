const { Videogame, Genre } = require("../db");

const getDBVideogameByIdController = async (idGame) => {
  try {
    //* busca el juego en la bdd según id y lo filtra a él y a los array que incluye
    //* si no lo encuentra retorna false (catch)
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
      origin: "database",
    };
    return videogame;
  } catch (error) {
    return false;
  }
};

module.exports = getDBVideogameByIdController;
