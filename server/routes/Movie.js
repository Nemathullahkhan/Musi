const express = require("express");
const router = express.Router();
const axios = require("axios");

const dotenv = require("dotenv");
dotenv.config();

//Fetching movies from the OMDb API
router.get("/:title",async(req,res)=>{
    // fetch the movies from the omdb APi 
    // How to do that ?
    // by using axios or fetch 
    // we'll try the axios method with async calls 
    const API_KEY = process.env.API_KEY;
    const movie = req.params.title;
    try{
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${movie}`);
        return res.json(response.data);
    }catch(err){
        return res.status(400).json("Error");
    }
})


module.exports = router;