const { Genre } = require("../db");

const getGenresController = async () => {
  //* trae todos los géneros de la base de datos y los retorna
  const genres = await Genre.findAll();
  return genres;
};

module.exports = getGenresController;
