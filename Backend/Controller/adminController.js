const userModel = require('../Models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const securePassword = async (password) => {
    try {
      const hashPassword = bcrypt.hash(password, 10);
      return hashPassword;
    } catch (error) {
      console.log(error.message);
    }
  };

const adminLogin = async (req, res) => {

    try {
        const { email, password } = req.body
        const existUser = await userModel.findOne({ email: email })

        if (existUser) {
            if (existUser.is_admin > 0) {

                const isPassword = await bcrypt.compare(password, existUser.password)
                if (isPassword) {
                    const adminToken = jwt.sign({ adminId: existUser._id }, process.env.TOKEN_KEY, { expiresIn: '1h' })
                    res.json({ adminData: existUser, adminToken, status: true })
                } else {
                    res.json({ alert: "Password is incorrect" })
                }
            } else {
                res.json({ alert: "Your are not an admin" })
            }
        } else {
            res.json({ alert: "You are not not registered" })
        }


    } catch (error) {
        console.log(error.message);
    }
}

const userList = async (req, res) => {
    try {
        const userData = await userModel.find({ is_admin: 0 })
        if (userData) {
            res.json({ status: true, userData })
        } else {
            res.json({ status: false, userData })
        }
    } catch (error) {
        console.log(error.message);
    }
}


const deleteUser = async (req, res) => {
    try {
        const { userId } = req.body
        const deletedUser = await userModel.deleteOne({ _id: userId })
        if (deletedUser) {
            res.json({ deleted: true })
        } else {
            res.json({ deleted: false })
        }
    } catch (error) {
        console.log(error.message);
    }
}

const editUserDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = await userModel.findById(id)
        if (userData) {
            res.json({ userData, staus: true, message: "Data found" })
        } else {
            res.json({ staus: false, message: "Data not found" })
        }
    } catch (error) {
        console.log(error.message);
    }
}

const updateUserDetails = async (req, res) => {
    try {
        const { id, name, email, number } = req.body
        const updateUserData = await userModel.updateOne({ _id: id }, { $set: { name, email, mobile: number } })//,{new:true}
        if (updateUserData) {
            res.json({ userData: updateUserData, status: true, alert: "updation completed" })
        } else {
            res.json({ status: false, alert: 'updation failed' })
        }
    } catch (error) {
        console.log(error.message);
    }
}

const addUserData = async (req,res) => {
    try {
      const {name,email,number,password} = req.body
      const emailExist  = await userModel.findOne({email:email})
      if(emailExist){
        res.json({status:false,alert:"This user is already exist"})
      }else{
        const spassword = await securePassword(password)
        const user = new userModel({
          email,
          name,
          mobile:number,
          password:spassword,
          is_admin:0
        })
        const userData = await user.save()
        res.json({userData,status:true,alert:"Registration"})
      }
    } catch (error) {
      console.log(error.message);
    }
  }
module.exports = {
    adminLogin,
    userList,
    deleteUser,
    editUserDetails,
    updateUserDetails,
    addUserData
}