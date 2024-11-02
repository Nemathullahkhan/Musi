const express = require('express');
const connectDB = require('./db'); // Import the connectDB function
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
//Router
const router = require("./routes/index");

const PORT =  process.env.PORT||4000;

const app = express();

//Middleware configuration
app.use(express.json());
app.use(cors());

// Connecting to MONGODB by calling connectDB
connectDB();

// Router test 
app.use("/api/v1",router);
app.listen(PORT,()=>{
    console.log(`Server is listening at ${PORT}`);
})

