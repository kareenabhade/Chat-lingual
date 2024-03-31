const express = require("express");
const {sendMessage, allMessages} = require("../controller/messageController");
const {protect} = require('../Middleware/authMiddleware');
const { translate } = require("../Middleware/translateMiddleware");
const router = express.Router();


router.route('/').post(protect,translate,sendMessage);
router.route('/:chatId').get(protect,allMessages);

module.exports = router;
