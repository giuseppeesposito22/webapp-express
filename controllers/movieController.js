const connection = require("../data/db");

const index = (req, res) => {
  const query = "SELECT * FROM movies";
  connection.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "Query failed" });

    const movies = results;

    movies.map((movie) => {
      pathImage(movie);
    });

    res.json({
      data: movies,
    });
  });
};

const show = (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM movies WHERE id= ?";

  connection.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ message: "Query failed" });
    if (results.length === 0)
      return res.status(404).json({ message: "Movie not found" });

    const movie = results[0];
    pathImage(movie);

    const queryRewies = "SELECT * FROM reviews WHERE movie_id = ?";

    connection.query(queryRewies, [id], (err, results) => {
      if (err) return res.status(500).json({ message: "Query failed" });
      movie.reviews = results;

      res.json({ data: movie });
    });
  });
};

const storeReview = (req, res) => {
  const { id } = req.params;

  const { name, vote, text } = req.body;

  const dataValues = [id, name, vote, text];

  let errors = [];

  if (!vote || vote < 1 || vote > 5) {
    errors.push({ message: "Il voto deve essere compreso tra 1 e 5" });
  }

  if (!name) {
    errors.push({ message: "Nome obbligatorio" });
  }

  if (!text || text.length < 5) {
    errors.push({
      message: "Inserire una recensione con lunghezza minima di 5 lettere",
    });
  }

  if (errors.length > 0) {
    return res.status(402).json({ errors });
  }

  const query =
    "INSERT INTO film.reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)";

  connection.query(query, dataValues, (err, results) => {
    if (err) return res.status(500), json({ message: "Query failed", err });

    res.status(201).json({ message: "review added successfully" });

    console.log(results);
  });
};

// metodo per trasformare il path dell'immagine di ogni film
const pathImage = (movie) => {
  movie.image = `http://localhost:3000/img/movies_cover/${movie.image}`;

  return movie;
};

module.exports = { index, show, storeReview };
