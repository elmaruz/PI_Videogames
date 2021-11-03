const { Router } = require("express");
const { Videogame, Genre } = require("../db.js");
const axios = require("axios");
const { APIKEY } = process.env;
const { Op } = require("sequelize");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

let pages = [];

router.get("/videogames", async (req, res) => {
  let count = 0;

  pages = [];
  let head = await axios.get(`https://rawg.io/api/games?key=${APIKEY}`);
  let current = head.data;
  pages.push(current);
  while (count < 4) {
    let getNext = await axios.get(current.next);
    pages.push(getNext.data);
    current = getNext.data;
    count++;
  }
  let arr1 = [];
  if (!req.query.name) {
    arr1 = [];
    let myDb = await Videogame.findAll({
      include: Genre,
    });
    arr1.push(myDb);
    for (var i = 0; i < pages.length; i++) {
      var x = pages[i].results.map((elem) => {
        return {
          id: elem.id,
          name: elem.name,
          genres: elem.genres,
          image: elem.background_image,
          rating: elem.rating,
          platforms: elem.platforms.map((elem) => elem.platform.name),
        };
      });
      arr1.push(x);
    }
  } else if (req.query.name) {
    arr1 = [];
    let findDb = await Videogame.findAll({
      include: Genre,
      where: {
        name: { [Op.like]: `%${req.query.name}%` },
      },
    });
    arr1.push(findDb);
    for (var i = 0; i < pages.length; i++) {
      var y = pages[i].results
        .filter((elem) =>
          elem.name.toLowerCase().includes(req.query.name.toLowerCase())
        )
        .map((elem) => {
          return {
            id: elem.id,
            name: elem.name,
            genres: elem.genres,
            image: elem.background_image,
            rating: elem.rating,
            platforms: elem.platforms.map((elem) => elem.platform.name),
          };
        });
      arr1.push(y);
    }
  }
  // res.send(myDb);
  // arr1.push(myDb);
  let flatarr = arr1.flat();
  if (flatarr.length > 0) {
    res.send(flatarr);
  } else {
    res.send([{ name: "Videogame not found", image: "x", genres: [""] }]);
  }
  // mergeDb = [myDb, pageRes.flat(Infinity)];
  // res.send(mergeDb);
});

router.get("/videogame/:id", async (req, res) => {
  let id = req.params.id;
  if (id && id.length < 9) {
    let request = await axios.get(
      `https://rawg.io/api/games/${id}?key=${APIKEY}`
    );
    let info = {
      name: request.data.name,
      genres: request.data.genres.map((elem) => elem.name).join(" / "),
      image: request.data.background_image,
      description: request.data.description.replace(/(<([^>]+)>)/gi, ""),
      released: request.data.released,
      rating: request.data.rating,
      platforms: request.data.platforms
        .map((elem) => elem.platform.name)
        .join(" - "),
    };
    res.send(info);
  } else if (id && id.length > 9) {
    let dbSearch = await Videogame.findByPk(id, { include: Genre });
    let infoDb = {
      name: dbSearch.name,
      genres: dbSearch.genres.map((elem) => elem.name).join(" / "),
      image: dbSearch.image,
      description: dbSearch.description,
      released: dbSearch.released,
      rating: dbSearch.rating,
      platforms: dbSearch.platforms.map((elem) => elem).join(" - "),
    };
    res.send(infoDb);
  }
});

router.get("/genres", async (req, res) => {
  let genres = await axios.get(`https://api.rawg.io/api/genres?key=${APIKEY}`);
  let genresList = genres.data.results.map((elem) => elem.name);
  let dbFind = await Genre.findAll();
  let mappedGenres = genres.data.results.map((elem) => {
    return {
      name: elem.name,
    };
  });

  if (dbFind.length < 1) {
    genresList.forEach((elem) => Genre.create({ name: elem }));
    res.send(mappedGenres);
  } else {
    res.send(dbFind);
  }
});

router.post("/videogame", async (req, res) => {
  let { name, description, released, rating, genres, platforms, image } =
    req.body;
  let nuVideo = await Videogame.create({
    name,
    description,
    released,
    rating,
    image,
    platforms,
  });

  genres.forEach(async (genre) => {
    let gen = await Genre.findOne({ where: { name: genre } });
    nuVideo.addGenre(gen);
  });
  res.send("Game created");
});

module.exports = router;

// let genres = await axios.get(`https://api.rawg.io/api/genres?key=${APIKEY}`);
// let genresList = genres.data.results.map((elem) => elem.name);
// let dbFind = await Genre.findAll();

// if (dbFind.length < 1) {
//   genresList.forEach((elem) => Genre.create({ name: elem }));
//   res.send(dbFind);
// } else {
//   res.send(dbFind);
// }
