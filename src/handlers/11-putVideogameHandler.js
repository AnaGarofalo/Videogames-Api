const putVideogameController = require("../controllers/11-putVideogameController");

const putVideogameHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    if (!description || !id)
      return res.status(200).json({ error: "Incomplete data" });

    //* llama al controller que modifica al videojuego. Este retorna un booleano que indica si
    //* el juego fue actualizado o no
    const modified = await putVideogameController(id, description);
    if (modified) res.status(200).json({ modified: true });
    else res.status(404).json({ error: "Invalid information" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = putVideogameHandler;
