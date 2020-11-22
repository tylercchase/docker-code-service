const express = require('express');
const passport = require('passport');
const router = express.Router();


// @desc Auth with google
// @route GET /auth/google
router.get('/google', passport.authenticate('google', {scope: ['profile']}));

// @desc Google callback
// @route GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/'}), (req, res) => {
    res.redirect('http://localhost:41309/dashboard');
});

// @desc Logout user
// @route /auth/logout
router.get('/logout', (req,res) => {
    req.logout();
    res.redirect('http://localhost:41309/login')
});
module.exports = router;