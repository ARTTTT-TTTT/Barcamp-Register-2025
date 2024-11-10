const router = require("express").Router();
const registerController = require("../controllers/registerController");
const slipController = require("../controllers/slipController");
const userController = require("../controllers/userController")

//middleWare
const session = require("../middleware/sessionMiddleWare");
const upload = require("../upload");

router.put("/register", session, registerController);
router.post("/slip", session, upload.single("slip"), slipController);
router.get("/get_user" , userController)


module.exports = router;
