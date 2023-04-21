const { Videogame, Genre } = require("../db");
require("dotenv").config();
const { Op } = require("sequelize");

const postVideogameController = async (game) => {
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
