const getApiVideogamesByNameController = require("../controllers/02-getApiVideogamesByNameController");
const getDBVideogamesByNameController = require("../controllers/02-getDBVideogamesByNameController");

const getVideogamesByNameHandler = async (name) => {
  const apiVideogames = await getApiVideogamesByNameController(name);
  const dbVideogames = await getDBVideogamesByNameController(name);
  const videogames = [...dbVideogames, ...apiVideogames].slice(0, 15);
  if (!videogames.length) return { error: "No games were found" };
  return videogames;
};
module.exports = getVideogamesByNameHandler;
