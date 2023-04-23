const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizcontroller');

// Other quiz route handlers...

router.post('/api/quizzes', quizController.createQuiz);

module.exports = router;