const express = require("express");
const { handleRegister, handleAuthUser, allUsers } = require("../controller/userController");
const {protect} = require('../Middleware/authMiddleware');
const router = express.Router();

router.route("/").post(handleRegister).get(protect, allUsers);
router.route("/login").post(handleAuthUser)
module.exports = router;