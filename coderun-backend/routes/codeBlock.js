const express = require('express');
const router = express.Router();
const {ensureAuth} = require('../middleware/auth');
const CodeBlock = require('../models/CodeBlock');
// @desc Make a new codeblock
// @route GET /
router.post('/',ensureAuth, async (req,res) => {
    try {
        req.body.user = req.user.id;
        await CodeBlock.create(req.body);
    } catch (error) {
        console.error(error);
    }
})


module.exports = router