const getDBVideogamesController = require("./01-getDBVideogamesController");

const getDBVideogamesByGenreController = async (genre) => {
  //* trae a todos los juegos de la bdd y en cada uno se fija si alguno de los géneros que
  //* vienen en el array de géneros coincide con el género solicitado
  const allDBVideogames = await getDBVideogamesController();

  const dbVideogames = [];
  allDBVideogames.forEach((game) => {
    game.genres.forEach((gameGenre) => {
      if (gameGenre.name === genre) dbVideogames.push(game);
    });
  });

  return dbVideogames;
};

module.exports = getDBVideogamesByGenreController;
