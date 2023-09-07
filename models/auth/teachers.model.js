const mongoose = require("mongoose");

const teachersAuthScema = mongoose.Schema({
     userName: {
          type: String,
          trim: true,
          required: [true, "user name is required"]
     },
     email: {
          type: String,
          required: [true, "email is required"]
     },
     password: {
          type: String,
          trim: true,
          required: [true, "password is required"]
     },
     role : {
          type : String,
          default : "teacher"
      },
     date: {
          type: Date,
          default: Date.now
     }

})

module.exports = mongoose.model("teachersAuth", teachersAuthScema)