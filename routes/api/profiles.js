const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const passport=require('passport');

//Load Validation
const validateProfileInput=require('../../validation/profile');


// Load Profile
const Profile=require('../../models/Profile');
//const Project=require('../../models/Projects');

const User=require('../../models/User');

//@route GET api/profile/test
//@route Test post route
//@access Public

//router.get('/test', (req,res) => res.json({msg:"Users work"}));


//@route GET api/profile/handle/:handle
//@route Get someone's profile with a handle
//@access Private

router.get(
    '/handle/:handle',
    passport.authenticate('jwt',{session:false}),
    (req,res)=>{
    const errors={};

    Profile.findOne({handle : req.params.handle})
        .populate('user', ['name','avatar'])
        .then(profile =>{
            if(!profile) {
                errors.noprofile='There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

//@route GET api/profile/all
//@route Get someone's profile with a handle
//@access Private

router.get(
    '/all',
    passport.authenticate('jwt',{session:false}),
    (req,res)=>{
    const errors={};
    User.find({"name":{"$regex": req.query.name, "$options": "i" }},{_id:1,name:1,email:1
        }).then(profile =>{
            if(!profile) {
                errors.noprofile='There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});



//@route GET api/profile/
//@route Get current user profile
//@access Private

router.get(
    '/',
    passport.authenticate('jwt',{session:false}),
    (req,res)=>{
    const errors={};

    Profile.findOne({user : req.user.id})
        .populate('user', ['name','avatar'])
        .then(profile =>{
            if(!profile) {
                errors.noprofile='There is no profile for this user.';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});


//@route GET api/profile/:handle
//@route Get current user profile
//@access Private

router.get(
    '/:handle',
    (req,res)=>{
    const errors={};

    Profile.findOne({handle : req.params.handle})
        .then(profile =>{
            if(!profile) {
                errors.noprofile='There is no profile for this user.';
                return res.status(404).json(errors);
            }
            res.json(profile.worked);
        })
        .catch(err => res.status(404).json(err));
});



//@route POST api/profile/workinghours
//@route Create current users profile
//@access Private

router.post('/workinghours', passport.authenticate('jwt',{session:false}),(req,res)=>{
          
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1;
    var curr_year = d.getFullYear();
    var today=(curr_month  + "/" + curr_date + "/" + curr_year);


    let hours= req.body.map(project => { if(project.hasOwnProperty('hours') && project.hours) { 
        return {
            
            hours: Number(project.hours),
            name: project.name,
            _id: project._id
        }
     } else {
            undefined;
    }});
    

    hours = hours.filter((i) => i);

    let worked={};
    worked={
        'date': today,
        'jobdone': hours
    }

    Profile.findOne({user: req.user.id})
    .then(profile => {
            if(profile){
                Profile.findOneAndUpdate(
                    { 'user': req.user.id, 'worked.date':today },
                    {   $set: {worked} },
                    { new: true }
                )
                .then(profile => {
                    if(!profile){
                        Profile.findOneAndUpdate(
                            { 'user': req.user.id},
                            {   $push: { worked }
                            },
                            { new: true }
                        ).then( profile => res.json.profile );
                    }
                }).catch(err=>console.log(err));
            } 
    });
    res.status(200);
});

//@route POST api/profile/
//@route Create current users profile
//@access Private

router.post(
    '/',
    passport.authenticate('jwt',{session:false}),
    (req,res)=>{
        const {errors, isValid} = validateProfileInput(req.body);

        //Check Validation
        if(!isValid){
            //Return any errors with 400 status
            return res.status(400).json(errors);
        }

        //Get fields
        const profileFields={};
        profileFields.user=req.user.id;
        if(req.body.handle) profileFields.handle=req.body.handle;
        if(req.body.date) profileFields.date=req.body.date;
        if(req.body.status) profileFields.status=req.body.status;
        if(req.body.organization) profileFields.organization=req.body.organization;
        if(req.body.organization) profileFields.workinghours=req.body.workinghours;

 
        //Skills
        if(typeof req.body.skills !== 'undefined') {
            profileFields.skills = req.body.skills.split(',');
        }

        Profile.findOne({user: req.user.id})
            .then(profile => {
                if(profile) {
                    // Update
                    Profile.findOneAndUpdate(
                        { user: req.user.id },
                        { $set: profileFields },
                        { new: true }
                    )
                    .then(profile => res.json(profile));
                } else {
                    // Create

                    // Check if handle exists
                    Profile.findOne({ handle: profileFields.handle })
                        .then(profile=>{
                            if(profile){
                                errors.handle='That handle alredy exits.'
                                res.status(400).json(errors);
                            }
                        })
                        new Profile(profileFields).save()
                            .then(profile => res.json(profile))
                }
            })

        /*
        //HRS or Project Leader
        if(typeof req.body.projects !== 'undefined') {
            profileFields.skills = req.body.skills.split(',');
            profileFields.=req.user.id;
            if(req.body.date) profileFields.date=req.body.date;
            if(req.body.date) profileFields.date=req.body.date;
            if(req.body.date) profileFields.date=req.body.date;
        }
        if(req.body.status) profileFields.status=req.body.status;
        if(req.body.organization) profileFields.organization=req.body.organization;
        if(req.body.workinghours) profileFields.workinghours=req.body.workinghours;
        */
});

module.exports=router;