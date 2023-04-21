const { Videogame } = require("../db");

const putVideogameController = async (id, description) => {
  const update = await Videogame.update({ description }, { where: { id } });
  if (update.length) return true;
  return false;
};

module.exports = putVideogameController;
