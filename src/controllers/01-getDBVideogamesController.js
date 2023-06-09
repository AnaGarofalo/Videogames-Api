const { Videogame, Genre } = require("../db");

const getDBVideogamesController = async () => {
  //* busca todos los videojuegos de la bdd
  const videogames = await Videogame.findAll({
    attributes: ["id", "name", "background_image", "rating"],
    include: {
      model: Genre,
      attributes: ["id", "name"],
      through: { attributes: [] },
    },
  });

  //* filtra los resultados para mandar al front sólo las propiedades que necesita para el home
  const newVideogames = videogames.map((game) => {
    console.log(game);
    return {
      id: game.id,
      name: game.name,
      genres: game.Genres,
      background_image: game.background_image,
      rating: game.rating,
      origin: "database",
    };
  });
  return newVideogames;
};
module.exports = getDBVideogamesController;
