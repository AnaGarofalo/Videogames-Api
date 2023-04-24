const { Videogame, Genre } = require("../db");
require("dotenv").config();
const { Op } = require("sequelize");

const postVideogameController = async (game) => {
  //* crea el juego en la bdd, busca los géneros de la misma que coincidan con los métodos incluidos
  //* en el array del juego a crear y los asocia con el nuevo juego
  const newGame = await Videogame.create(game);

  game.genres.forEach(async (genre) => {
    const fullGenre = await Genre.findOne({
      where: { name: { [Op.iLike]: genre } },
    });
    if (!fullGenre) newGame.createGenre({ name: genre });
    else newGame.addGenre(fullGenre.id);
  });

  return true;
};

module.exports = postVideogameController;
