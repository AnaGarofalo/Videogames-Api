const { Op } = require("sequelize");
const getApiVideogamesByNameController = require("../controllers/02-getApiVideogamesByNameController");
const { Videogame } = require("../db");

//* validaciones para crear videojuegos
const validate = async (req, res, next) => {
  const {
    name,
    background_image,
    description,
    platforms,
    released,
    rating,
    genres,
  } = req.body;
  //has all the propertys?
  if (
    ![
      name,
      background_image,
      description,
      platforms,
      released,
      rating,
      genres,
    ].every((property) => property !== undefined)
  ) {
    return res.status(400).json({ error: "Incomplete data" });
  }

  //check name
  if (typeof name !== "string")
    return res.status(400).json({ error: "Name must be a string" });

  //check img
  if (typeof background_image !== "string")
    return res.status(400).json({ error: "Image must be a string" });

  if (!background_image.length)
    return res.status(400).json({ error: "Image is too short" });

  //check description
  if (typeof description !== "string")
    return res.status(400).json({ error: "Description must be a string" });

  if (!description.length)
    return res.status(400).json({ error: "Description is too short" });

  if (description.length > 255)
    return res.status(400).json({ error: "Description is too long" });

  //check platforms
  if (!Array.isArray(platforms))
    return res.status(400).json({ error: "Platforms must be an array" });

  if (!platforms.length)
    return res.status(400).json({ error: "Platforms is too short" });

  //   check released
  if (typeof released !== "string")
    return res.status(400).json({ error: "Released must be a string" });

  if (released.length !== 10)
    return res.status(400).json({ error: "Released must be a date" });

  if (Number(released.slice(0, 4)) > Number(Date().slice(11, 16)))
    return res.status(400).json({ error: "Released must be a past date" });

  if (Number(released.slice(5, 7)) > 12)
    return res.status(400).json({ error: "Released must be a date" });

  if (Number(released.slice(8, 10)) > 31)
    return res.status(400).json({ error: "Released must be a date" });

  //check rating
  if (typeof rating !== "number")
    return res.status(400).json({ error: "Rating must be a number" });

  if (rating > 5)
    return res.status(400).json({ error: "Rating must be under 5" });

  //genres
  if (!Array.isArray(genres))
    return res.status(400).json({ error: "Genres must be an array" });

  if (!genres.length)
    return res.status(400).json({ error: "Genres is too short" });

  //alredy exists in api?
  const apiResults = await getApiVideogamesByNameController(name);
  if (apiResults.length) {
    const closestName = apiResults[0].name;
    if (closestName.toLowerCase() === name.toLowerCase())
      return res.status(400).json({ error: "Videogame alredy exists" });
  }

  //alredy exists in db?
  const dbResults = await Videogame.findOne({
    where: { name: { [Op.iLike]: name } },
  });
  if (dbResults)
    return res.status(400).json({ error: "Videogame alredy exists" });

  next();
};

module.exports = validate;
