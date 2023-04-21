const getGenresController = require("../controllers/08-getGenresController");

const getGenresHandler = async (req, res) => {
  try {
    const genres = await getGenresController();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getGenresHandler;
