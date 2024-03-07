const express = require('express');
const {accessChat, fetchChats} = require('../controller/chatController');
const {protect} = require('../Middleware/authMiddleware');
const router = express.Router();



router.route('/').post(protect, accessChat).get(protect, fetchChats);

module.exports = router;