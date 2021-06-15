const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    website:{
        type: String
    },
    genres:
    {
        type:[String],
        required: true
    },
    bio:
    {
        type:String,
    },
    social: {
        instagram:{
            type: String
        },
        spotify:{
            type:String
        },
        snapchat:{
            type:String 
        }
    },
    date:{
        type:Date,
        default:Date.now
    }
    
});

module.exports = Profile = mongoose.model('Profile',ProfileSchema);