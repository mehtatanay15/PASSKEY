const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'Tanayisagoodb$oy'


// Route 1:Create a user using:POST "/api/auth/createuser". No login required 
router.post('/createuser',[
    body('name','enter a valid name').isLength({min: 3}),
    body('email','enter a valid email').isEmail(),
    body('password','password should be of 5 characters').isLength({min: 5})
], async(req, res) => {
    let success = false;
    //if there are errors return bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors: errors.array()});
    }
    // check whether the user with this email exists
    
    try{
    let user = await User.findOne({email: req.body.email});
    if(user ){
        return res.status(400).json({success,error: "Sorry a user with this "})
    }
        const salt = await bcrypt.genSalt(10)
        const secPass= await bcrypt.hash(req.body.password,salt)
        user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
    })
    const data = {
        user:{
            id: user.id
        }
    }
    const authtoken = jwt.sign(data,JWT_SECRET)
    success = true
    res.json({success,authtoken})
}
catch(error)
{
    console.error(error.message)
    res.status(500).send("Internal Server error")
}
})


//Route 2: Authenticate a user using POST "/api/auth/login". No login required
router.post('/login',[
    body('email','enter a valid email').isEmail(),
    body('password','password cannot be blank').exists()
], async(req, res) => {
    let success = false;
      //if there are errors return bad request and the errors
      const errors = validationResult(req);
      if(!errors.isEmpty()){
          return res.status(400).json({errors: errors.array()});
      }
      const{email,password} = req.body;
      try{
        let user= await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Please try to login with correct credentials"})
        }
        const passwordCompare = await  bcrypt.compare(password, user.password);
        if(!passwordCompare)
        {
            return res.status(400).json({success, error:"Please try to login with correct credentials"})
        }
        const  data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data,JWT_SECRET)
        success = true;
        res.json({success,authtoken})
      } 
      catch(error)
        {
            console.error(error.message)
            res.status(500).send("Internal Server error")
        }
    })

//Route 2: Get loggined User Details using POST "/api/auth/getuser".Login required

router.post('/getuser', fetchuser,async(req, res) =>{
try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
    
} catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server error")
}
})    

module.exports = router;