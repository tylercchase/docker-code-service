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
router.get('/:id',ensureAuth,async (req,res) => {
    let codeBlock = await CodeBlock.findById(req.params.id).populate('user').lean()
    if(!codeBlock){
        res.json({error: 'Not found'});
    }
    if(codeBlock.user._id != req.user.id){
        console.log(codeBlock.user._id);
        console.log(req.user.id);
        res.json({error: 'Invalid user'})
    }else{
        res.json(codeBlock);
    }
});

router.post('/edit/:id', ensureAuth, async (req,res) => {
    try{
        let codeBlock = await CodeBlock.findById(req.params.id).lean();
        if(!codeBlock){
            res.json({error: 'Not found'});
        }
        if(codeBlock.user._id != req.user.id){
            res.json({error: "Can't get code block"})
        } else{
            let code = await CodeBlock.findOneAndUpdate({_id: req.params.id}, req.body, {
                new: true,
                runValidators: true
            });
        }
    }
    catch(error){
        
    }
});
module.exports = router