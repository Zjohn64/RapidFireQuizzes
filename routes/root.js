const express = require('express')
const router = express.Router()
const path = require('path')

// Import the quizRoutes
const quizRoutes = require('./quizRoutes');

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

// Use the quizRoutes as middleware
router.use(quizRoutes);

module.exports = router