const express = require("express");
const PORT = 2000;
const cors = require("cors");
const server = express();
const db = require("./models");
const bearerToken = require("express-bearer-token");

require("dotenv").config();

server.use(express.json());
server.use(cors());
server.use(bearerToken());

const { user } = require("./routers");
const { book } = require("./routers");

server.use("/lib", user);
server.use("/lib", book);

server.listen(PORT, () => {
  // db.sequelize.sync({ alter: true });
  console.log(`berhasil di port : ${PORT}`);
});
