const { Videogame } = require("../db");

const deleteVideogameController = async (id) => {
  const game = await Videogame.findByPk(id);
  if (game) {
    await game.destroy();
    return true;
  } else return false;
};

module.exports = deleteVideogameController;
