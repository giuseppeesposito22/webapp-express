// config
const express = require("express");
const cors = require("cors");
const app = express();

// import
require("dotenv").config();
const { APP_PORT, APP_URL, FRONTEND_URL } = process.env;
const { notFound, errorHandler } = require("./middlewares/error");
const movieRouters = require("./routers/movieRouter");
const corsConfig = { origin: FRONTEND_URL };

// cors
app.use(cors(corsConfig));

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
  console.log(`App listening on ${APP_URL}:${APP_PORT}`);
});
