const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

const { userMiddleware } = require('../middleware');

router.get('/me', userMiddleware, userController.getMe);
router.post('/wallet/add', userMiddleware, userController.addFunds);
router.get('/courses', userController.getCourses);

module.exports = router;