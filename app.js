// config
const express = require("express");
const app = express();

// import
require("dotenv").config();
const { APP_PORT, APP_URL } = process.env;
const { notFound, errorHandler } = require("./middlewares/error");
const movieRouters = require("./routers/movieRouter");

// static assets
app.use(express.static("public"));

// body parser
app.use(express.json());

// routers secondo architettura REST
app.use("/movies", movieRouters);

//middlewares
app.use(notFound);
app.use(errorHandler);

// listen
app.listen(3000, () => {
  console.log(`App listening on ${APP_URL}: ${APP_PORT}`);
});
