const { Op } = require("sequelize");
const { Videogame, VideogameGenre, Genre } = require("../db");

const putVideogameController = async (
  id,
  { name, background_image, platforms, rating, description, released, genres }
) => {
  //* modifica un sólo juego, pues la id es única, pero el método devuelve un array
  //* devuelve true o false indicando si el juego fue actualizado
  const update = await Videogame.update(
    { name, background_image, platforms, rating, description, released },
    { where: { id } }
  );

  await VideogameGenre.destroy({ where: { VideogameId: id } });
  const updatedGame = await Videogame.findByPk(id);
  genres.forEach(async (genre) => {
    console.log(genre);
    const fullGenre = await Genre.findOne({
      where: { name: { [Op.iLike]: genre } },
    });
    updatedGame.addGenre(fullGenre.id);
  });
  if (update.length) return true;
  return false;
};

module.exports = putVideogameController;
