//get the user registration(test route)
const { compare } = require('bcrypt');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../../middleware/auth');
const config = require('config');
const{check,validationResult}= require('express-validator');
const jwt = require('jsonwebtoken');
//@route POST api/auth
//@desc authenticate user and use token(in this wenned to login the user an get the token back)
const user = require('../../models/Model');
router.get('/',auth,async(req,res)=>{
    try{
        const user = await User.findById(req.user.id).select('-password')//-paswword leaves the password and just gives the username
        res.json(user);
    }
catch(err){
    console.error(err.message);
    res.status(500).send('server error');
    }
});
 //call back function
//function inside the function
router.post('/',[
   //this is a login not sign up so we removed check email and all
    check('email','please check email').isEmail(),
    check('password','password is required').exists()
],
async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

  
    const {name,email,password} = req.body;
    try{
        let user = await User.findOne({email});

        if(!user){
            return res
            .status(400)
            .json({errors: [{msg: "Invalid credentials"}] });
        }
        
  //match email and password here
 //we need to make sure the password matches
//bcrypt has a method known as compare takes a plain text password and a encrypted password.
//and tells if there is a match or not

const isMatch = await bcrypt.compare(password,user.password);
if(!isMatch)
{
    return res.Router.status(400)
    .json({errors:[{msg:"invalid credentials" }] });
}
//two arguments in this
//1. password:which is given during login
        
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload,
            config.get('jwtSecret'),
                {expiresIn:360000},
                (err,token)=>{
                    if(err) throw err;
                    res.json({token});
                }
        );
    
    
            }catch(err)
    {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

module.exports=router;//helps to use the router file in other
