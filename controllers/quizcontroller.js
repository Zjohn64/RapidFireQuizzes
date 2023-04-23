const Quiz = require('../models/quiz');

exports.createQuiz = async (req, res) => {
  // Assuming quiz data is sent in the request body
  const quizData = req.body;
  const newQuiz = new Quiz(quizData);

  try {
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (err) {
    console.log(err); // Add this line to print the error details
    if (err.code === 11000) {
      res.status(400).json({ error: 'A quiz with this name already exists for this author.' });
    } else {
      res.status(500).json({ error: 'Error saving quiz:', err });
    }
  }
};