const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

const connectDB = async()=>{
    try{
        await mongoose.connect(MONGO_URL);
        console.log('Database is connected');
    }catch(err){
        console.log('Database connection failed:',err.message)
    }
}
module.exports = connectDB