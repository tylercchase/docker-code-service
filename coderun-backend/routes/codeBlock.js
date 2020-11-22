const express = require('express');
const router = express.Router();
const {ensureAuth} = require('../middleware/auth');
const CodeBlock = require('../models/CodeBlock');
// @desc Make a new codeblock
// @route GET /
router.post('/',ensureAuth, (req,res) => {
    try {
        
    } catch (error) {
        console.error(error);
    }
})


module.exports = router