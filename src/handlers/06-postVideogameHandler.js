const postVideogameController = require("../controllers/06-postVideogameController");

const postVideogameHandler = async (req, res) => {
  try {
    const {
      name,
      background_image,
      description,
      platforms,
      released,
      rating,
      genres,
    } = req.body;

    const created = await postVideogameController({
      name,
      background_image,
      description,
      platforms,
      released,
      rating,
      genres,
    });
    if (created) res.status(201).json({ created: "true" });
    else res.status(400).json({ error: "Videogame alredy exists" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postVideogameHandler;
