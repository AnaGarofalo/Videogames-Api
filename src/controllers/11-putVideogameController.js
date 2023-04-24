const { Videogame } = require("../db");

const putVideogameController = async (id, description) => {
  //* modifica un sólo juego, pues la id es única, pero el método devuelve un array
  //* devuelve true o false indicando si el juego fue actualizado
  const update = await Videogame.update({ description }, { where: { id } });
  if (update.length) return true;
  return false;
};

module.exports = putVideogameController;
