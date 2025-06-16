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

// metodo per trasformare il path dell'immagine di ogni film
const pathImage = (movie) => {
  movie.image = `http://localhost:3000/img/movies_cover/${movie.image}`;

  return movie;
};

module.exports = { index, show };
