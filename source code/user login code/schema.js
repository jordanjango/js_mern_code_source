const mongoose = require('mongoose');
//blueprint of how the Database will be constructed
const UserSchema = new mongoose.Schema({ //using the mongoose.schema to make
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    }
});
module.exports = User = mongoose.model('user',UserSchema);