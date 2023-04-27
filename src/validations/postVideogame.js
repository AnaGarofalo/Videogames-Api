const { Op } = require("sequelize");
const getApiVideogamesByNameController = require("../controllers/02-getApiVideogamesByNameController");
const { Videogame } = require("../db");

//* validaciones para crear videojuegos
const validate = async (req, res, next) => {
  const { id } = req.params;

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
  if (!name.length) return res.status(400).json({ error: "Name is too short" });
  if (name.length > 255)
    return res.status(400).json({ error: "Name is too long" });

  //check img
  if (typeof background_image !== "string")
    return res.status(400).json({ error: "Image must be a string" });

  if (!background_image.length)
    return res.status(400).json({ error: "Image is too short" });
  if (background_image.length > 255)
    return res.status(400).json({ error: "Image is too long" });

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
  if (platforms[0].length > 255)
    return res.status(400).json({ error: "Platforms is too long" });

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
  if (rating < 0) {
    return res.status(400).json({ error: "Rating must be a positive number" });
  }

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

  //*si tengo que un juego con el mismo nombre en la base de datos puede ser que ya exista
  //* pero si estoy por hacer un update (ahí tengo id) tengo que chequear que no sea el mismo juego
  //* que quiero modificar. Si no tengo id es un post, con lo cual que exista un juego con el mismo nombre
  //* significa que el juego ya existe
  if (dbResults) {
    if (id) {
      if (id !== dbResults.id)
        return res.status(400).json({ error: "Videogame alredy exists" });
    } else return res.status(400).json({ error: "Videogame alredy exists" });
  }
  next();
};

module.exports = validate;
