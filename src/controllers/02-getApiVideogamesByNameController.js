require("dotenv").config();
const axios = require("axios");
const { API_URL_BASE, API_KEY } = process.env;

const getApiVideogamesByNameController = async (name) => {
  //* trae los juegos de la api según nombre y los filtra para llevar sólo las propiedades necesarias
  const requestResults = await axios.get(
    `${API_URL_BASE}/games?search=${name}&key=${API_KEY}`
  );
  const videogames = requestResults.data.results;
  const finalVideogames = videogames.map(
    ({ id, name, genres, background_image }) => {
      const newGenres = genres.map((genre) => {
        return { id: genre.id, name: genre.name };
      });
      const newGame = { id, name, genres: newGenres, background_image };
      return newGame;
    }
  );
  return finalVideogames;
};
module.exports = getApiVideogamesByNameController;
