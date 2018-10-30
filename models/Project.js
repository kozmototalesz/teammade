const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//Create Project Schema
const ProjectSchema = new Schema({
    handle: {
        type:String,
        required: true
    },
    leader: {
        type:String,
        required: true
    },
    name: {
        type:String,
        required: true
    },
    status:{
        type: Boolean,
        default: false
    },
    description:{
        type: String
    },
    milestones: [
        {
            name:{
                type: String,
                required: true
            },
            description:{
                type: String,
                required: true
            },
            deadline:{
                type: Date,
                required: true
            },
            status:{
                type: Boolean,
                default: false
            },
            end:{
                type: Date
            }
        }
    ],
    end: {
            type: Date
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports=User=mongoose.model('projects', ProjectSchema);