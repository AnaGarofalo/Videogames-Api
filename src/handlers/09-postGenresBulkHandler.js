const postGenresBulkController = require("../controllers/09-postGenresBulkController");

//* esta ruta está simplificada porque sólo se usa durante la fase de desarrollo o cuando hace falta
//* reiniciar la bdd
const postGenresBulkHandler = async (req, res) => {
  try {
    await postGenresBulkController();
    res.send("creados");
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = postGenresBulkHandler;
