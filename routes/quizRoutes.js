const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizcontroller');



router.post('/api/quizzes', quizController.createQuiz);
router.get('/:id', quizController.getQuizById);
router.get('/api/quizzes/:id', quizController.getQuizById);
router.put('/api/quizzes/:id', quizController.updateQuiz);
router.get('/by-user/:userId', quizController.getQuizzesByUserId);
router.get('/', quizController.getQuizzes);

module.exports = router;