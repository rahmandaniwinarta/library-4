const router = require("express").Router();

const { admin } = require("../controllers");
const { verifyToken, checkRole } = require("../middleware/user");

router.post("/registerAdmin", admin.registerAdmin);
router.post("/loginAdmin", admin.loginAdmin);

module.exports = router;