const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//Create Project Schema
const ProjectSchema = new Schema({

    handle: {
        type:String,
        required: true
    },
    leader: {
        type: Schema.Types.ObjectId,
        ref: 'users'
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
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            name: {
                type: String
            },
            status: {
                type: String
            },
            organization: {
                type: String
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports=User=mongoose.model('projects', ProjectSchema);