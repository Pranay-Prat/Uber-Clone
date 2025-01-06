const mongoose = require('mongoose');
const bcryptjs=require('bcryptjs');
const jwt= require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true ,
            minLength: [3,'First name must be atleast 3 characters long'],
        },
        lastname:{
            type: String,
            minLength: [3,'Last name must be atleast 3 characters long'],
        }},
        email:{
            type: String,
            required: true,
            unique:true ,
            minLength: [5,'Email must be atleast 3 characters long'],
        },
        password:{
            required:true,
            type: String,
            select: false
        },
        socketId:{
            type: String,
        },
    
});
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}
userSchema.methods.comparePassword = async function(password){
    return await bcryptjs.compare(password,this.password)    
}
userSchema.statics.hashPassword = async function(password){
    return await bcryptjs.hash(password,10);
}
const userModel = mongoose.model('user', userSchema);
module.exports = userModel;