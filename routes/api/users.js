const express=require('express');
const router=express.Router();
const gravatar= require('gravatar');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys=require('../../config/keys');
const passport=require('passport');


//Load User Module
const User=require('../../models/User');

//@route GET api/users/test
//@route Test post route
//@access Public

router.get('/test', (req,res) => res.json({msg:"Users work"}));

//@route GET api/users/register
//@route Register a user
//@access Public

router.post('/register', (req,res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(user) {
                return res.status(400).json({email:'E-mail already exists'})
            }
            else 
            { 
                const avatar=gravatar.url(req.body.email,{
                    s: '200', 
                    r: 'pg',
                    d: 'mm'
                })

                const newUser=new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password
                });
                bcrypt.genSalt(10,(err,salt)=> {
                    bcrypt.hash(newUser.password, salt, (err,hash)=> {
                        if(err) throw err;
                        newUser.password=hash;
                        newUser
                            .save()
                            .then(user=>res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })

});

//@route GET api/users/login
//@route Login a User and return a JWT Token
//@access Public

router.post('/login', (req,res) => {
    const email=req.body.email;
    const password=req.body.password;

    //Find user By Email
    User.findOne({email})
        .then(user=>{
        //Check User
            if(!user){
                return res.status(404).json({email: 'User not Found'});
            }
        //Check password
            bcrypt.compare(password,user.password)
                .then( 
                    matched => { 
                        if (matched){    
                            //User matched
                            
                            //User Payload
                            const payload={
                                id: user.id,
                                name: user.name,
                                avatar: user.avatar
                            }
                            //Sign Token
                            jwt.sign(
                                payload,
                                keys.secret,
                                {expiresIn: 3600},
                                (err,token) => {
                                    res.json({
                                        success: true,
                                        token: 'Bearer ' + token
                                    })
                                }
                            );
                        }
                        else {
                            res.status(400).json({'password': 'Password is incorrect.'})
                        }    
                    }
                )
                
        })

});


//@route GET api/users/me
//@route Return me
//@access Private

router.get('/me', passport.authenticate('jwt',{ session:false }), (req,res) => {
     res.json({msg: 'Success'});
});


module.exports=router; 