const postVideogameBulkController = require("../controllers/07-postVideogameBulkController");

const postVideogameBulkHandler = async (req, res) => {
  try {
    const videogames = req.body;
    await postVideogameBulkController(videogames);

    res.send("creados");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = postVideogameBulkHandler;
