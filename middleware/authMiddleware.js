exports.isAuthenticated = (req, res, next) => {
    console.log('Checking authentication:', req.session);

    if (req.isAuthenticated()) {
        next();
    } else {
        console.log('Session:', req.session); // Add this line
        res.status(401).json({ message: 'Unauthorized: Please log in' });
    }
};