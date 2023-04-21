const { Videogame, Genre } = require("../db");
const { Op } = require("sequelize");

const getDBVideogamesByNameController = async (name) => {
  const videogames = await Videogame.findAll({
    attributes: ["id", "name", "background_image", "rating"],
    where: { name: { [Op.iLike]: `%${name}%` } },
    include: {
      model: Genre,
      attributes: ["id", "name"],
      through: { attributes: [] },
    },
  });
  const newVideogames = videogames.map(
    ({ id, name, background_image, rating, Genres }) => {
      return { id, name, background_image, rating, genres: Genres };
    }
  );
  return newVideogames;
};
module.exports = getDBVideogamesByNameController;
