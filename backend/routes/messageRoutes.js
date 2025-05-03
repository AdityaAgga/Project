const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const auth = require('../middleware/auth');

router.get('/:userId', auth, messageController.getMessages);
router.post('/', auth, messageController.createMessage);

module.exports = router; 