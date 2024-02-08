const express = require("express");
const { handleRegister,handleAuthUser } = require("../controller/userController");
const router = express.Router();

router.route("/").post(handleRegister);
router.route("/login").post(handleAuthUser)
module.exports = router;