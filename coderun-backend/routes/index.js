const express = require('express');
const router = express.Router();
const {ensureAuth, ensureGuest} = require('../middleware/auth');
const CodeBlock = require('../models/CodeBlock');
// @desc Login
// @route GET /
router.get('/',ensureGuest, (req,res) => {
    res.send('Login');
})

// @desc Dashboard
// @route GET /dashboard
router.get('/dashboard',ensureAuth, async (req,res) => {
    try {
        const stories = await CodeBlock.find({user: req.user.id});
        res.json(stories);

    } catch (error) {
        console.error(error);
    }
})
module.exports = router