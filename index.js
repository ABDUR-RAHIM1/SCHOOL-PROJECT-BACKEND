const app = require("./app")
const dotenv = require('dotenv')
const mongoose = require("mongoose")
dotenv.config()

const PORT = process.env.PORT ||9500


app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Database is connected");
    } catch (error) {
      console.log("Error, Database not connected", error);
    }
  });