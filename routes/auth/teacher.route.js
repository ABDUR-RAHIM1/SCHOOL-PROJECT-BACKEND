const { registerTechers, loginTechers, getTeachers, deleteTeachers, resetPassword } = require("../../controllers/auth/teachers.controller")

const router = require("express").Router()


router.get("/", getTeachers)
router.post("/register", registerTechers)
router.post("/login", loginTechers) 
router.delete("/:id", deleteTeachers) 
router.post("/reset", resetPassword) 


module.exports = router