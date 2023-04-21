const { Videogame } = require("../db");

const postVideogameBulkController = async (videogames) => {
  const newGames = await Videogame.bulkCreate(videogames);
  newGames.forEach(async (game) => {
    await game.addGenres([
      "0d56520c-bd92-4d24-9890-b0ee02526b97",
      "2d26d852-ba5a-409e-9e5c-e88839c2a270",
    ]);
  });
};
module.exports = postVideogameBulkController;
