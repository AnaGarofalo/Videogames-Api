const getApiVideogamesByNameController = require("../controllers/02-getApiVideogamesByNameController");
const getDBVideogamesByNameController = require("../controllers/02-getDBVideogamesByNameController");

const getVideogamesByNameHandler = async (name) => {
  //*llamo a los controllers que buscan por nombre en la api y en la bdd
  const apiVideogames = await getApiVideogamesByNameController(name);
  const dbVideogames = await getDBVideogamesByNameController(name);

  //*la consigna pedía que buscáramos sólo 15 videojuegos, los de la bdd tienen una respuesta más exacta
  const videogames = [...dbVideogames, ...apiVideogames].slice(0, 15);

  //* en esta implementación del front end, se fija si la respuesta es o no un array para saber si
  //* lo debe mapear o si no llegaron resultados, de esta manera lo distingue del array vacío cuando
  //* está esperando los resultados
  if (!videogames.length) return { error: "No games were found" };
  return videogames;
};
module.exports = getVideogamesByNameHandler;
