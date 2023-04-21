require("dotenv").config();
const axios = require("axios");
const { API_URL_BASE, API_KEY } = process.env;

const getApiVideogamesByNameController = async (name) => {
  const requestResults = await axios.get(
    `${API_URL_BASE}/games?search=${name}&key=${API_KEY}`
  );
  const videogames = requestResults.data.results;
  const finalVideogames = videogames.map(
    ({ id, name, genres, background_image, rating }) => {
      const newGenres = genres.map((genre) => {
        return { id: genre.id, name: genre.name };
      });
      const newGame = { id, name, genres: newGenres, background_image, rating };
      return newGame;
    }
  );
  return finalVideogames;
};
module.exports = getApiVideogamesByNameController;
