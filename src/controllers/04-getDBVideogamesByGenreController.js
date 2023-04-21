const getDBVideogamesController = require("./01-getDBVideogamesController");

const getDBVideogamesByGenreController = async (genre) => {
  const allDBVideogames = await getDBVideogamesController();

  const dbVideogames = [];
  allDBVideogames.forEach((game) => {
    let flag = false;
    game.genres.forEach((gameGenre) => {
      if (gameGenre.name === genre) flag = true;
    });
    if (flag) dbVideogames.push(game);
  });

  return dbVideogames;
};

module.exports = getDBVideogamesByGenreController;
