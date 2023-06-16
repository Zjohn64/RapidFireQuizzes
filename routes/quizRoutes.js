const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizcontroller');

// Other quiz route handlers...

router.post('/api/quizzes', quizController.createQuiz);
router.get('/api/quizzes/:id', quizController.getQuizById);
router.put('/api/quizzes/:id', quizController.updateQuiz);
router.get('/by-user/:userId', quizController.getQuizzesByUserId);

module.exports = router;