const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile } = require('../controllers/usercontroller');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', isAuthenticated, getProfile)

module.exports = router;