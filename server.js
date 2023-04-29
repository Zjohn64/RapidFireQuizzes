require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');
const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorhandler');
const cookieParser = require('cookie-parser');
const quizRoutes = require('./routes/quizRoutes');
const userRoutes = require('./routes/userRoutes');
const Quiz = require('./models/quiz');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.use(express.static('public'));

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ client: mongoose.connection.getClient() }),
      cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));


app.use(passport.initialize());
app.use(passport.session());

require('./passport-config')(passport);

app.use('/', express.static(path.join(__dirname, 'views')))

app.use('/', require('./routes/root'))

app.use('/api/quizzes/:id', quizRoutes);

app.use('/api/users', userRoutes);

app.post('/auth/local', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }));
app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))