const { Genre } = require("../db");
const { default: axios } = require("axios");
require("dotenv").config();
const { API_URL_BASE, API_KEY } = process.env;

const postGenresBulkController = async () => {
  //* trae todos los géneros de la bdd y los filtra para retornar sólo las propiedades necesarias
  let genreArray = await axios.get(`${API_URL_BASE}/genres?key=${API_KEY}`);
  genreArray = genreArray.data.results.map((genre) => {
    return { name: genre.name };
  });
  await Genre.bulkCreate(genreArray);
};
module.exports = postGenresBulkController;
