const studentAuth = require("../../models/auth/students.model")
const bcrypt = require("bcryptjs")
const getStudent = async (req, res) => {
    try {
        const studnets = await studentAuth.find();
        res.status(200).json({
            total: studnets.length,
            studnets
        })
    } catch (error) {
        globarError(res, error.message)
    }
}


const registerStudent = async (req, res) => {
    const { userName, email, password, condition } = req.body
    const hashPassword = await bcrypt.hash(password, 10)
    const existEmail = await studentAuth.findOne({ email });
    if (existEmail) {
        return res.status(404).json({
            message: "Email Already exist"
        })
    }
    try {
        const newTeacher = await studentAuth.create({ userName, email, password: hashPassword, condition })
        res.status(201).json({
            message: "teachers Account Created successfuly",
            success: true,
            teacher: newTeacher
        })
    } catch (error) {
        globarError(res, error.message)
    }
}


const loginStudent = async (req, res) => {
    const { email, password } = req.body;
    try {
        const isEmail = await studentAuth.findOne({ email })
        if (isEmail) {
            const validEmail = await bcrypt.compare(password, isEmail.password)
            console.log(isEmail)
            const { password: hashedPassword, ...studentsInfo } = isEmail.toObject();
            if (validEmail) {
                res.status(200).json({
                    message: "Login Successfull",
                    students: studentsInfo
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

const deleteStudent = async (req, res) => {
    const student = await studentAuth.findOne({ _id: req.params.id })

    if (student) {
        await studentAuth.findByIdAndDelete(req.params.id)
        try {
            res.status(200).json({
                message: "Delete Your Account successfully",
                student,
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


const resetStudent = async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        const isStudent = await studentAuth.findOne({ email })
        console.log(isStudent)
        if (isStudent && isStudent.userName === userName) {
            const hashedPassword = await bcrypt.hash(password, 10)
            await isStudent.updateOne({
                $set: {
                    password: hashedPassword
                }
            }, { new: true })
            res.status(200).json({ message: "password reset success" })
        } else {
            res.status(400).json({
                message: "provide valid username and email"
            })
        }
    } catch (error) {
        globarError(res, error.message)
    }

}



module.exports = { getStudent, registerStudent, loginStudent, deleteStudent, resetStudent }