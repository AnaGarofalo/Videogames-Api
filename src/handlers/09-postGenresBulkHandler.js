const postGenresBulkController = require("../controllers/09-postGenresBulkController");

const postGenresBulkHandler = async (req, res) => {
  try {
    await postGenresBulkController();
    res.send("creados");
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = postGenresBulkHandler;
