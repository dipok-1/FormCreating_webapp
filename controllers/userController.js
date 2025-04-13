

//  logic for register and log in 
const usermodel = require('../models/User')
const bcrypt = require('bcryptjs');
const generatetoken = require('../utils/generateToken');

const registeruser = async(req,res)=>{
 try {
    const {username,email,password} = req.body;
    const nameexists = await usermodel.findOne({username})
    if(nameexists){
        return res.status(400).send({message:'username already taken. please another name.'})
    }
    const checkexists  = await usermodel.findOne({email});
    if(checkexists){
        return res.status(400).send({message:'user already exist!'})
    }
    const hashedpassword = await bcrypt.hash(password,10)
    const user = new usermodel({
        username,
        email,
        password:hashedpassword
    })
    await user.save();
    return res.status(201).send({message:'user have succesfully registered!'})
 } catch (error) {
    console.error(error)
    return res.status(500).send({message:'error registering user'})
 }
}


const loginuser = async(req,res)=>{
try {
    const {email,password} = req.body
    const userexists = await usermodel.findOne({email});
    if(!userexists){
        return res.status(400).send({message:'invalid email!'})
    }
    const validpassword = await bcrypt.compare(password,userexists.password);
    if(!validpassword){
        return res.status(404).send({message:'invalid password!'})
    }
    const token = generatetoken(userexists._id)
    return res.status(200).json({
        message:'login successfull',
        token,
        user:{
            id:userexists._id,
            username:userexists.username,
            email:userexists.email
        }
    }
    )

} catch (error) {
    console.error(error)
    res.status(500).send({message:'error login user'})
}
}



module.exports = {registeruser,loginuser}