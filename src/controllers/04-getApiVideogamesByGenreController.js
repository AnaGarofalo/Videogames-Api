const getApiVideogamesController = require("./01-getApiVideogamesController");

const getApiVideogamesByGenreController = async (genre) => {
  const allApiVideogames = await getApiVideogamesController();

  const apiVideogames = [];
  allApiVideogames.forEach((game) => {
    let flag = false;
    game.genres.forEach((gameGenre) => {
      if (gameGenre.name === genre) flag = true;
    });
    if (flag) apiVideogames.push(game);
  });

  return apiVideogames;
};

module.exports = getApiVideogamesByGenreController;
