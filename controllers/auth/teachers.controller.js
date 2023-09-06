const globarError = require("../../middlewere/globalError")
const teachersAuth = require("../../models/auth/teachers.model")
const bcrypt = require('bcryptjs');

const getTeachers = async (req, res) => {
   try {
    const teachers = await teachersAuth.find();
    res.status(200).json({
        total: teachers.length,
        teachers
    })
   } catch (error) {
       globarError(res , error.message)
   }
}

const registerTechers = async (req, res) => {
    const { userName, email, password, condition } = req.body
    const hashPassword = await bcrypt.hash(password, 10)
    const existEmail = await teachersAuth.findOne({ email });
    if (existEmail) {
        return res.status(404).json({
            message: "Email Already exist"
        })
    }
    try {
        const newTeacher = await teachersAuth.create({ userName, email, password: hashPassword, condition })
        res.status(201).json({
            message: "teachers Account Created successfuly",
            success: true,
            teacher: newTeacher
        })
    } catch (error) {
        globarError(res, error.message)
    }
}


const loginTechers = async (req, res) => {
    const { email, password } = req.body;
    try {
        const isEmail = await teachersAuth.findOne({ email })
        if (isEmail) {
            const validEmail = await bcrypt.compare(password, isEmail.password)
            console.log(isEmail)
            const { password: hashedPassword, ...teacherInfo } = isEmail.toObject();
            if (validEmail) {
                res.status(200).json({
                    message: "Login Successfull",
                    teacher: teacherInfo
                })
            } else {
                res.status(404).json({
                    message: "Email Or Password failed"
                })
            }
        } else {
            res.status(404).json({
                message: "Email Or Password failed"
            })
        }

    } catch (error) {
        globarError(res, error.message)
    }
}


const deleteTeachers = async (req, res) => {
    const teacher = await teachersAuth.findOne({ _id: req.params.id })

    if (teacher) {
        await teachersAuth.findByIdAndDelete(req.params.id)
        try {
            res.status(200).json({
                message: "Delete Your Account successfully",
                teacher,
            })
        } catch (error) {
            globarError(res, error.message)
        }
    } else {
        res.status(404).json({
            message: "Account not found"
        })
    }


}


// reset password 

const resetPassword = async (req, res) => {
    const { userName, email , password } = req.body;
    try {
        const isTeacher = await teachersAuth.findOne({email})
        console.log(isTeacher)
         if (isTeacher && isTeacher.userName === userName) {
            const hashedPassword = await bcrypt.hash(password, 10)
             await isTeacher.updateOne({
                 $set : {
                    password : hashedPassword
                 }
            },{new : true})
            res.status(200).json({message :"password reset success"})
         }else{
            res.status(400).json({
                message :"provide valid username and email"
            })
         }
    } catch (error) {
        globarError(res , error.message)
    } 
}



module.exports = { getTeachers, registerTechers, loginTechers, deleteTeachers, resetPassword }