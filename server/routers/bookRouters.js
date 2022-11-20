const router = require("express").Router;

const { book } = require("../controllers");

router.post("/create", book.create);

module.exports = router;
