const deleteVideogameController = require("../controllers/10-deleteVideogameController");

const deleteVideogameHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteVideogameController(id);
    if (!deleted) return res.status(404).json({ error: "Game not found" });
    res.status(200).json({ deleted: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteVideogameHandler;
