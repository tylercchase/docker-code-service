const express = require('express');
const passport = require('passport');
const router = express.Router();


// @desc Auth with google
// @route GET /auth/google
router.get('/google', passport.authenticate('google', {scope: ['profile']}));

// @desc Google callback
// @route GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/', successRedirect: '/dashboard'}), (req, res) => {
    console.log(`${process.env.BASEURL}/dashboard`)
    res.redirect(`${process.env.BASEURL}/dashboard`);
});

// @desc Logout user
// @route /auth/logout
router.get('/logout', (req,res) => {
    console.log(req)
    req.logout();
    res.redirect(`${process.env.BASEURL}/login`)
});
module.exports = router;