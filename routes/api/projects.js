const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const passport=require('passport');

//Load Validation
const validateProjectInput=require('../../validation/project');


// Load Profile
const Profile=require('../../models/Profile');
const Project=require('../../models/Project');

const User=require('../../models/User');



//@route GET api/profile/
//@route Get All profile
//@access Private

router.get(
    '/all/',
    passport.authenticate('jwt',{session:false}),
    (req,res)=>{
    const errors={};

    Profile.find({})
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

//@route GET api/projects
//@route Check a project
//@access Private

router.get(
    '/',
    passport.authenticate('jwt', {session:false}),
    (req,res)=>{
    const errors={};

    Project.find({leader:req.user.id})
        .then(project => {

            if(!project) {
                errors.noproject='You do not have projects.';
                return res.status(404).json(errors);
            }

            if(project[0].leader===req.user.id){
             res.json(project);
            } else {
                errors.notallowed='You cannot see this project.';
                res.status(400).json(errors);
            }
        })
        .catch(err => res.status(404).json(err));
});     


//@route GET api/projects
//@route Check a project
//@access Private

router.get(
    '/:handle',
    passport.authenticate('jwt', {session:false}),
    (req,res)=>{
    const errors={};

    Project.findOne({handle: req.params.handle})
        .then(project => {

            if(!project) {
                errors.noproject='There is no project for this handle.';
                return res.status(404).json(errors);
            }

            if(project.leader===req.user.id ){
             res.json(project);
            } else {
                errors.notallowed='You cannot see this project.';
                res.status(400).json(errors);
            }
        })
        .catch(err => res.status(404).json(err));
});     

//@route POST api/projects
//@route Add project
//@access Private

router.post(
    '/',
    passport.authenticate('jwt',{session:false}),
    (req,res)=>{
        const {errors, isValid} = validateProjectInput(req.body);

        //Check Validation
        if(!isValid){
            //Return any errors with 400 status
            return res.status(400).json(errors);
        }

        //Get fields
        const projectFields={};
        projectFields.leader=req.user.id;

        if(req.body.handle) projectFields.handle=req.body.handle;                

        if(req.body.name) projectFields.name=req.body.name;
        if(req.body.description) projectFields.description=req.body.description;

        if(req.body.status) projectFields.status=req.body.status;
        if(req.body.end) projectFields.end=req.body.end;
        
        Project.findOne({handle: req.body.handle})
            .then(project => {
                    if(project) {
                        // Update

                        if(project.leader===req.user.id){
                            Project.findOneAndUpdate(
                                { handle: req.body.handle },
                                { $set: projectFields },
                                { new: true }
                            )
                            .then(project => res.json(project));
                        } else {
                            errors.leader='You are not the leader of this project.';
                            res.status(400).json(errors);
                        }
                    } else {
                        // Create

                        // Check if handle exists
                        Project.findOne({ handle: projectFields.handle })
                            .then(project=>{
                                if(project){
                                    errors.handle='That handle already exits.'
                                    res.status(400).json(errors);
                                }
                            })
                        
                            new Project(projectFields).save()
                                .then(project => res.json(project))
                    }
                })
});


//@route POST api/
//@route Add Milestone to a project
//@access Private

router.post('/milestones/', passport.authenticate('jwt',{session:false}),(req,res)=>{
          
    const newMilestone = {
        name: req.body.name,
        description: req.body.description,
        deadline: req.body.deadline,
        status: req.body.status,
        end: req.body.end
    }
    //Add milestones   

    Project.findOne({handle: req.body.handle})
        .then(project => {
            let errors={};
            if(project) {
                if(project.leader===req.user.id){
                    Project.findOne({ handle: req.body.handle })
                        .then(project => {
                            project.milestones.push(newMilestone);

                            project.save().then(res.json(project));

                        })
                        
                } else {
                    errors.leader='You are not the leader of this project. You cannot add milestones.';
                    res.status(400).json(errors);
                }
            } else {
                    errors.handle='There is no project for this handle.'
                    res.status(400).json(errors);
            }
        })
});

router.post('/members/', passport.authenticate('jwt',{session:false}),(req,res)=>{
          
    const newMember = {
        user: req.body.id,
        name: req.body.name,
        status: req.body.status,
        organization: req.body.organization
    }
    //Add milestones   

    Project.findOne({handle: req.body.handle})
        .then(member => {
            let errors={};
            if(member) {
                if(project.leader===req.user.id){
                    Project.findOne({ handle: req.body.handle })
                        .then(project => {
                            project.milestones.push(newMember);

                            project.save().then(res.json(project));

                        })
                        
                } else {
                    errors.leader='You are not the leader of this project. You cannot add milestones.';
                    res.status(400).json(errors);
                }
            } else {
                    errors.handle='There is no project for this handle.'
                    res.status(400).json(errors);
            }
        })
});

module.exports=router;