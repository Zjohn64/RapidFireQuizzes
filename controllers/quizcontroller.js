const Quiz = require('../models/quiz');

exports.createQuiz = async (req, res) => {
  try {
    const userId = req.user.id;
    const newQuiz = new Quiz({
      ...req.body,
      author: userId,
    });
    const savedQuiz = await newQuiz.save();
    res.status(200).json(savedQuiz);
  } catch (err) {
    console.error('Error creating quiz:', err);
    res.status(500).json({ message: 'Error creating quiz.' });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('author', 'username');
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

exports.getQuizzesByUserId = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ author: req.params.userId });
    res.json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching quizzes' });
  }
};

exports.updateQuiz = async (req, res) => {
  const { id } = req.params;
  const { questions } = req.body;

  try {
    const quiz = await Quiz.findByIdAndUpdate(id, { questions }, { new: true });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    console.error('Error updating quiz:', error);
    res.status(500).json({ message: 'Error updating quiz' });
  }
};

exports.getQuizzes = async (req, res) => {
  try {
      const quizzes = await Quiz.find().populate('author');
      res.json(quizzes);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};