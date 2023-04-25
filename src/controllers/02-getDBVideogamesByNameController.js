const { Videogame, Genre } = require("../db");
const { Op } = require("sequelize");

const getDBVideogamesByNameController = async (name) => {
  //* busca los juegos en la bdd según el nombre y los filtra para llevar sólo las propiedades necesarias
  const videogames = await Videogame.findAll({
    attributes: ["id", "name", "background_image"],
    where: { name: { [Op.iLike]: `%${name}%` } },
    include: {
      model: Genre,
      attributes: ["id", "name"],
      through: { attributes: [] },
    },
  });
  const newVideogames = videogames.map(
    ({ id, name, background_image, rating, Genres }) => {
      return {
        id,
        name,
        background_image,
        genres: Genres,
        origin: "database",
        rating,
      };
    }
  );
  return newVideogames;
};
module.exports = getDBVideogamesByNameController;
