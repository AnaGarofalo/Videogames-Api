const { Videogame } = require("../db");

const deleteVideogameController = async (id) => {
  //* busca el juego y lo elimina, retorna un booleano que indica si lo eliminó o no
  const game = await Videogame.findByPk(id);
  if (game) {
    await game.destroy();
    return true;
  } else return false;
};

module.exports = deleteVideogameController;
