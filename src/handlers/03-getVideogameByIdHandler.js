const getApiVideogameByIdController = require("../controllers/03-getApiVideogameByIdController");
const getDBVideogameByIdController = require("../controllers/03-getDBVideogameByIdController");

const getVideogameByIdHandler = async (req, res) => {
  const { idVideogame } = req.params;
  try {
    const apiVideogame = await getApiVideogameByIdController(idVideogame);
    if (apiVideogame) return res.status(200).json(apiVideogame);

    const dbVideogame = await getDBVideogameByIdController(idVideogame);
    if (dbVideogame) return res.status(200).json(dbVideogame);
    else res.status(404).json({ error: "Videogame not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = getVideogameByIdHandler;
