const express = require('express');
const router = express.Router();
const {ensureAuth} = require('../middleware/auth');
const CodeBlock = require('../models/CodeBlock');
const bent = require('bent');
// @desc Make a new code block
// @route GET /code/
router.post('/',ensureAuth, async (req,res) => {
    try {
        req.body.user = req.user.id;
        await CodeBlock.create(req.body);
    } catch (error) {
        console.error(error);
    }
})
// @desc Get a specific code block
// @route GET /code/:id
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

// @desc Edit a specific code block
// @route POST /code/edit/:id
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


// @desc Run a specific code block
// @route POST /code/run/:id
router.get('/run/:id', ensureAuth, async (req,res) => {
    let codeBlock = await CodeBlock.findById(req.params.id).populate('user').lean()
    if(!codeBlock){
        res.json({error: 'Not found'});
    }
    if(codeBlock.user._id != req.user.id){
        console.log(codeBlock.user._id);
        console.log(req.user.id);
        res.json({error: 'Invalid user'})
    }else{
        //Stuff to run a thing
        let response;
        try{
            const post = bent('http://localhost:5000/', 'POST', 'string', 200);
            response = await post('run', {code: codeBlock.code});
        }
        catch(err){
            console.log(err);
        }
        res.json({stuff: response});
    }
});
module.exports = router