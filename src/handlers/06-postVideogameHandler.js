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

    //* llama al controller que crea el videojuego en la base de datos, éste retorna true o false
    //* según si fue creado o no (habiendo pasado la validación, la única razón por la que podría
    //* no crearlo es que el videojuego ya existiera o por un error de sistema)
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
