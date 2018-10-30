const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Profile Schema
const ProfileSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle:{
        type: String,
        required: true,
        max:40  
    },
    status:{
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    organization:{
        type: String
    },
    workinghours:{
        type: Number
    },
    projects: [
        {
            project: {
                type: Schema.Types.ObjectId,
                ref: 'projects'
            },
            percentage: {
                type: Number,
                required: true
            },
            leader: {
                type: Boolean,
                default: false
            },
            hours: [
                {
                    date: {
                        type: Date,
                        required: true,
                    },
                    hour: {
                        type: Number,
                        required: true
                    }
                }
            ]
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }

    /*
    beosztás
    szervezeti egység
    közvetlen felettes nem lát
    határozatlan 
    határozott
    kötött munkaidő (törzsidő (x óra))
    kötetlen munkaidő
    hány óra
    projekteken
    hány százalék 

    főnök adja meg 
    hány százalék, milyen projekt
    */

});

module.exports = mongoose.model('profiles', ProfileSchema);
