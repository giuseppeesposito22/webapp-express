const express = require("express");
const app = express();

require("dotenv").config();

const { APP_PORT, APP_URL } = process.env;

app.listen(3000, () => {
  console.log(`In ascolto su ${APP_URL}: ${APP_PORT}`);
});
