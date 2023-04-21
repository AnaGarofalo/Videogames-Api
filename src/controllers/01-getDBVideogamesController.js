const { Videogame, Genre } = require("../db");

const getDBVideogamesController = async () => {
  const videogames = await Videogame.findAll({
    attributes: ["id", "name", "background_image", "rating"],
    include: {
      model: Genre,
      attributes: ["id", "name"],
      through: { attributes: [] },
    },
  });
  const newVideogames = videogames.map((game) => {
    return {
      id: game.id,
      name: game.name,
      genres: game.Genres,
      background_image: game.background_image,
      rating: game.rating,
    };
  });
  return newVideogames;
};
module.exports = getDBVideogamesController;
