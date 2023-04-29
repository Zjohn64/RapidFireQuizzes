const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const userWithoutPassword = await User.findById(savedUser._id).select('-password');

    res.status(201).json({ message: 'User registered', user: userWithoutPassword });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user", error });
  }
};

exports.loginUser = (req, res, next) => {
    console.log('Starting loginUser');
    passport.authenticate('local', (err, user, info) => {
        console.log('Inside passport.authenticate');
        if (err) {
        console.log('Error during authentication:', err);
        return res.status(500).json({ message: 'Error during authentication', err });
        }
        if (!user) {
        console.log('User not found');
        return res.status(400).json({ message: info.message });
        }
        req.logIn(user, async (error) => {
        if (error) {
            console.log('Error during login:', error);
            return res.status(500).json({ message: 'Error during login', error });
        }
        try {
            const userWithoutPassword = await User.findById(user._id).select('-password').exec();
            res.status(200).json({ message: 'User logged in', user: userWithoutPassword });
        } catch (err) {
            res.status(500).json({ message: 'Error fetching user', error: err });
        }
        });
    })(req, res, next);
};

exports.getProfile = async (req, res) => {
    console.log('User ID:', req.session.passport.user);  
    try {
      const userId = req.session.passport.user;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: Please log in' });
      }
  
      const user = await User.findById(userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User profile', user });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Error fetching user profile', error });
    }
}; 