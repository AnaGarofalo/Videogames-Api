const getApiVideogamesController = require("./01-getApiVideogamesController");

const getApiVideogamesByGenreController = async (genre) => {
  //* trae a todos los juegos de la api y en cada uno se fija si alguno de los géneros que
  //* vienen en el array de géneros coincide con el género solicitado

  const allApiVideogames = await getApiVideogamesController();

  const apiVideogames = [];
  allApiVideogames.forEach((game) => {
    game.genres.forEach((gameGenre) => {
      if (gameGenre.name === genre) apiVideogames.push(game);
    });
  });

  return apiVideogames;
};

module.exports = getApiVideogamesByGenreController;
