const router = require("express").Router();

const { book } = require("../controllers");
const { verifyToken, checkRole } = require("../middleware/user");


router.post("/create", book.create);
router.get("/getAll", book.getAll);
router.get("/getBy", verifyToken, book.getBy);
router.delete("/delete", book.delete);
router.patch("/update", book.update);
router.get("/searchBy", book.searchBy);
router.get("sortBy", book.sortBy);


module.exports = router;
