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

router.get("/videogames", async (req, res) => {
  let count = 0; // variable to keep api page count
  let pages = []; // array to save api pages
  let head = await axios.get(`https://rawg.io/api/games?key=${APIKEY}`);
  let current = head.data; // api data structured as a linked list - assigning head to varible current
  pages.push(current); // pushing head's content (full page) to pages array - each page contains 20 games
  while (count < 4) {
    let getNext = await axios.get(current.next); // grab four more pages going through this linked list
    pages.push(getNext.data);
    current = getNext.data;
    count++;
  }
  let arr1 = []; // arr1 used to store games
  if (!req.query.name) {
    arr1 = []; // clearing arr1 before each request
    let myDb = await Videogame.findAll({
      include: Genre,
    });
    arr1.push(myDb); // if no req query, add all games from our db
    for (var i = 0; i < pages.length; i++) {
      var x = pages[i].results.map((elem) => {
        // needed properties come under the results prop of every page in api
        return {
          // mapping those properties out in an obj, reflecting how our db model structure for conformity
          id: elem.id,
          name: elem.name,
          genres: elem.genres,
          image: elem.background_image,
          rating: elem.rating,
          platforms: elem.platforms.map((elem) => elem.platform.name),
        };
      });
      arr1.push(x); // push every obj
    }
  } else if (req.query.name) {
    arr1 = [];
    let findDb = await Videogame.findAll({
      // if req query, find all games in db which contain req.query in name
      include: Genre,
      where: {
        name: { [Op.like]: `%${req.query.name}%` },
      },
    });
    arr1.push(findDb);
    for (var i = 0; i < pages.length; i++) {
      // filter out games in api pages which contain req query name
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
      arr1.push(y); // push every obj which contains req.query in its name prop
    }
  }
  let flatarr = arr1.flat(); // flatten the array to get rid of nested arrays
  if (flatarr.length > 0) {
    res.send(flatarr);
  } else {
    res.send([{ name: "Videogame not found", image: "x", genres: [""] }]); // send this message out if game not found
  }
});

router.get("/videogame/:id", (req, res) => {
  let id = req.params.id;
  if (id && id.length < 9) {
    axios
      .get(`https://rawg.io/api/games/${id}?key=${APIKEY}`)
      .then((r) => r.data)
      .then((data) => {
        let info = {
          name: data.name,
          genres: data.genres.map((elem) => elem.name).join(" / "),
          image: data.background_image,
          description: data.description.replace(/(<([^>]+)>)/gi, ""),
          released: data.released,
          rating: data.rating,
          platforms: data.platforms
            .map((elem) => elem.platform.name)
            .join(" - "),
        };
        res.send(info);
      });
  } else if (id && id.length > 9) {
    Videogame.findByPk(id, { include: Genre }).then((r) => {
      let infoDb = {
        // creating new obj with response values
        name: r.name,
        genres: r.genres.map((elem) => elem.name).join(" / "),
        image: r.image,
        description: r.description,
        released: r.released,
        rating: r.rating,
        platforms: r.platforms.map((elem) => elem).join(" - "),
      };
      res.send(infoDb);
    });
  }
});

router.get("/genres", async (req, res) => {
  let genres = await axios.get(`https://api.rawg.io/api/genres?key=${APIKEY}`);
  let genresList = genres.data.results.map((elem) => elem.name); // Just mapping out the names of genres
  let dbFind = await Genre.findAll(); // query to our Genres table
  let mappedGenres = genres.data.results.map((elem) => {
    // mapping out objs from the api as name:genre_name in order to send them as first response
    return {
      name: elem.name,
    };
  });

  if (dbFind.length < 1) {
    genresList.forEach((elem) => Genre.create({ name: elem })); // populate our db's Genres table if no entries found
    res.send(mappedGenres); // sending first response directly as mapped results from the api
  } else {
    res.send(dbFind); // if entries found in our db send them instead
  }
});

router.post("/videogame", async (req, res) => {
  let { name, description, released, rating, genres, platforms, image } =
    req.body; // destructuring the request's body expected params
  let nuVideo = await Videogame.create({
    name, // create a new object in db using body params
    description,
    released,
    rating,
    image,
    platforms,
  });

  genres.forEach(async (genre) => {
    // look for the req.body genre in db, Genre table
    let gen = await Genre.findOne({ where: { name: genre } });
    nuVideo.addGenre(gen); // where it matches add genre to newly created game entry
  });
  res.send("Game created");
});

module.exports = router;

// let id = req.params.id;
// if (id && id.length < 9) {
//   // db ids contain > 9 chars. if id < 9 chars long, gotta be api
//   let request = await axios.get(
//     `https://rawg.io/api/games/${id}?key=${APIKEY}` // requesting videogame with given id
//   );
//   let info = {
//     // creating new obj with response values
//     name: request.data.name,
//     genres: request.data.genres.map((elem) => elem.name).join(" / "),
//     image: request.data.background_image,
//     description: request.data.description.replace(/(<([^>]+)>)/gi, ""),
//     released: request.data.released,
//     rating: request.data.rating,
//     platforms: request.data.platforms
//       .map((elem) => elem.platform.name)
//       .join(" - "),
//   };
//   res.send(info); // send this object
// } else if (id && id.length > 9) {
//   // if id is > 9 chars long, gotta be from db
//   let dbSearch = await Videogame.findByPk(id, { include: Genre }); // query to db to find by id (primary key)
//   let infoDb = {
//     // creating new obj with response values
//     name: dbSearch.name,
//     genres: dbSearch.genres.map((elem) => elem.name).join(" / "),
//     image: dbSearch.image,
//     description: dbSearch.description,
//     released: dbSearch.released,
//     rating: dbSearch.rating,
//     platforms: dbSearch.platforms.map((elem) => elem).join(" - "),
//   };
//   res.send(infoDb); // send that object
// }
