const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const {validationResult} = require('express-validator');
module.exports.registerUser = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty){
        return res.status(400).json({erros: errors.array()})
    }
    const {fullname, lastname, email,password} = req.body;
    const hashPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
        firstname:fullname.firstname, lastname:fullname.firstname, email, password:hashPassword 
    });
    const token = user.generateAuthToken();
    res.status(201).json({token,user});
}