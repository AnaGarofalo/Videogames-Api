const deleteVideogameController = require("../controllers/10-deleteVideogameController");

const deleteVideogameHandler = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    //* llama al controller que borra un videojuego de la bdd. Este devuelve un booleano que indica
    //* si el juego fue borrado o no
    const deleted = await deleteVideogameController(id);
    if (!deleted) return res.status(404).json({ error: "Game not found" });
    res.status(200).json({ deleted: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteVideogameHandler;
