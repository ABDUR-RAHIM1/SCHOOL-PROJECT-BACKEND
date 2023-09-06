const { getStudent, registerStudent, deleteStudent, resetStudent, loginStudent } = require("../../controllers/auth/student.controller");

const router = require("express").Router();

router.get("/",getStudent)
router.post("/register",registerStudent)
router.post("/login",loginStudent)
router.delete("/:id",deleteStudent)
router.post("/reset",resetStudent)



module.exports = router;