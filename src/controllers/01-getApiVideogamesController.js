const axios = require("axios");
require("dotenv").config();
const { API_URL_BASE, API_KEY } = process.env;

const getApiVideogamesController = async () => {
  const promises = [];
  for (let i = 1; i < 11; i++) {
    promises.push(
      axios.get(`${API_URL_BASE}/games?page_size=10&page=${i}&key=${API_KEY}`)
    );
  }
  let videogames = [];

  await Promise.all(promises).then((responses) => {
    responses.forEach((response) => {
      videogames = [...videogames, ...response.data.results];
    });
  });

  const finalVideogames = videogames.map(
    ({ id, name, genres, background_image, rating }) => {
      const newGenres = genres.map((genre) => {
        return { id: genre.id, name: genre.name };
      });
      const newGame = { id, name, background_image, rating, genres: newGenres };
      return newGame;
    }
  );
  return finalVideogames;
};
module.exports = getApiVideogamesController;
