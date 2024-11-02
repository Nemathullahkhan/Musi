const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        max:50,
        unique:true,
        required:true,
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        min:6,
        required:true,
    },
    favorites:[{
        type:mongoose.Types.ObjectId,
        ref:"Movie"
    }],
    
})

const userModel = mongoose.model('User',userSchema);
module.exports = userModel;