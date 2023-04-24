const { default: axios } = require("axios");
require("dotenv").config();
const { API_URL_BASE, API_KEY } = process.env;

const getApiVideogameByIdController = async (idGame) => {
  //* trae de la api el videojuego por id y lo filtra y a los array que incluye

  //* si consigue el juego, lo retorna, sino retorna false (catch)
  try {
    const response = await axios.get(
      `${API_URL_BASE}/games/${idGame}?key=${API_KEY}`
    );
    let {
      id,
      name,
      background_image,
      platforms,
      description_raw,
      released,
      rating,
      genres,
    } = response.data;

    platforms = platforms.map((platform) => platform.platform.name);
    genres = genres.map((genre) => genre.name);

    const videogame = {
      id,
      name,
      background_image,
      platforms,
      description: description_raw,
      released,
      rating,
      genres,
    };
    return videogame;
  } catch (error) {
    if ((error.message = "Request failed with status code 404")) return false;
    else throw Error("Server Error");
  }
};
module.exports = getApiVideogameByIdController;
