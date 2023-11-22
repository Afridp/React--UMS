const userModel = require('../Models/userModel')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const hashPassword = async(password)=>{
    try {
        const phashed = await bcrypt.hash(password,10)
        return phashed
    } catch (error) {
        console.log(error.message)
    }
}

const userRegistration = async (req,res)=>{
    
    try {
        const { name , email , number ,password} = req.body

        const existUser = await userModel.findOne({email : email})
        
        if(existUser){
            res.json({ alert : 'This email is already registerd with us'})
        } else {
            const spassword = await hashPassword(password) 

            const newUser = new userModel({
                name : name,
                email : email,
                mobile : number,
                password : spassword,
                is_admin : 0
            })
        
            const userData = await newUser.save()
           
            const token = jwt.sign({userId : userData._id },process.env.TOKEN_KEY,{expiresIn : '1h'})

            res.json({userData,token,alert : "registered" , status : true})
        }
    }catch(error){
        console.log(error.message);
    }
}

const userLogin = async (req,res)=>{
    try {
        const {email,password} = req.body
        const existUser = await userModel.findOne({email : email})
        if (existUser){
            const isPassword = await bcrypt.compare(password,existUser.password)
            if(isPassword){
                const token =  jwt.sign({userId : existUser._id},process.env.TOKEN_KEY,{ expiresIn: '1h'})
                res.json({ userData : existUser , status : true ,token})
            }else{
                res.json({alert : "Password is incorrect,Please try again"})
            }
        }else{
            res.json({ alert : "You are not registered ,Please register"})
        }
    } catch (error) {
        console.log(error.message);
    }
}

const imageUpload = async (req,res)=>{
    try {
        const {userId} = req.body
        const imageName = req.file.filename
    
        await userModel.findOneAndUpdate({_id : userId},{ $set : {image : imageName}},{new:true})
        .then((response)=>{
    
            res.json({ updated : true , data : response})
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    userRegistration,
    userLogin,
    imageUpload
}