const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Password = require('../models/Password')
const { body, validationResult } = require('express-validator');

// routr 1: GET all the passwords 
router.get('/fetchallpasswords', fetchuser,async(req, res) => {
    const passwords = await Password.find({user: req.user.id})
    res.json(passwords);
});

// routr 2: add a password using POST
router.post('/addpassword', fetchuser,[
    body('name','enter a valid title').isLength({min: 3}),
    body('password','enter a valid password').isLength({min: 5}),
    body('tag','enter a tag').isLength({min: 5})
],async(req, res) => {
    try {
    const {name,password,tag} = req.body
    //if there are errors return bad request and the errors
     const errors = validationResult(req);
     if(!errors.isEmpty()){
         return res.status(400).json({errors: errors.array()});
     }
     const pass = new Password({
        name,password,tag, user: req.user.id
     })
    const savedpass= await pass.save()
    res.json(savedpass);
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server error")
    }
});

// routr 3: UPDATE all the passwords 
router.put('/updatepassword/:id', fetchuser,async(req, res) => {
    try {
    const {name,password,tag} = req.body
    const newpass = {}
    if(name){newpass.name = name}
    if(password){newpass.password = password}
    if(tag){newpass.tag = tag}
    
    //find the password
    let passwords = await Password.findById(req.params.id)
    if(!passwords){return res.status(404).send("Not found")}
    if(passwords.user.toString()!== req.user.id)
    {return res.status(401).send("Not allowed") }
    
    passwords = await Password.findByIdAndUpdate(req.params.id, {$set: newpass}, {new:true})
    res.json({passwords});
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server error")
    }
});


// routr 3: DELETE the password
router.delete('/deletepassword/:id', fetchuser,async(req, res) => {
    
    try {
    const {name,password,tag} = req.body
    
    //find the password
    let passwords = await Password.findById(req.params.id)
    
    if(!passwords){return res.status(404).send("Not found")}
    
    if(passwords.user.toString()!== req.user.id)
    {return res.status(401).send("Not allowed") }
    
    passwords = await Password.findByIdAndDelete(req.params.id)
    res.json({"success":"password has been deleted"});
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server error")
    }
});


module.exports = router;
