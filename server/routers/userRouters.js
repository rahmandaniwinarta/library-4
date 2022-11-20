const router = require("express").Router();

const { user } = require("../controllers");
const { verifyToken, checkRole } = require("../middleware/user");

router.post("/register", user.register);
router.post("/login", user.login);
router.get("/keepLogin", verifyToken, user.keepLogin);

module.exports = router;
