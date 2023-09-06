const express = require("express"); 
const app = express()
const cors = require('cors');
const teacherRouter = require("./routes/auth/teacher.route");
const studentRouter = require("./routes/auth/student.route");
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use(cors())

// teachers routers
app.use("/api/teachers", teacherRouter)

//  studmet auth router 
app.use("/api/students" , studentRouter )



//  test route
app.get("/test", (req, res)=>{
    res.send("test route")
})
/// error handler route
app.get("/*",(req, res, next) => {
    res.send("Routes Not Found")
 })






module.exports = app;