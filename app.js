// config
const express = require("express");
const app = express();

// import
require("dotenv").config();
const { APP_PORT, APP_URL } = process.env;
const { notFound, errorHandler } = require("./middlewares/error");

// static assets
app.use(express.static("public"));

// body parser
app.use(express.json());

app.get("/", (req, res) => {
  res.json("ok");
});

//middlewares
app.use(notFound);
app.use(errorHandler);

// listen
app.listen(3000, () => {
  console.log(`In ascolto su ${APP_URL}: ${APP_PORT}`);
});
