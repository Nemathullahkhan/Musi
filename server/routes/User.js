const express = require("express");
const axios = require("axios");
const router = express.Router();
const movieModel = require('../models/Movie.js');
const userModel = require('../models/User.js');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Environmental variables 
const dotenv = require("dotenv");
dotenv.config();


// create a user 
router.post("/register",async(req,res)=>{
    const { username, firstName, lastName, password } = req.body;
    try{

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password,salt);
        
        const response = new userModel({
            username,
            firstName,
            lastName,
            password:hash,
        })
    await response.save();    
    return res.status(201).json({msg:"User registered"});
    }catch(error){
        console.error(error);
        return res.status(500).json({ msg: "An error occurred during registration." });
    }
})


router.post('/login',async (req,res)=>{
    try{

        const {username,password} = req.body;
        // checking if the user exist in the user model or not 
        const user = await userModel.findOne({username});
        
        if(!user){
            return res.status(404).json({msg:"User not found"});
        }
        // if the user exist then we check whether the password matches or not for that we bcrypt package 
        const pass = await bcrypt.compareSync(password,user.password);
        if(!pass){
            return res.status(401).json({msg:"wrong crendentials"})
        }
        
        const token = jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn: '1h'});
        
        return res.status(200).json({msg:"Login Succesfull",token})
    }catch(error){
        console.error(error);
        return res.status(500).json({msg:"Server Error"});
    }
})






router.get("/savefav/:userId/:title", async (req, res) => {
    try {
        const { userId, title } = req.params;

        // Check if the movie already exists in the database
        let movie = await movieModel.findOne({ title });
        if (!movie) {
            // If the movie doesn't exist, fetch from OMDb API
            const omdbApiKey = process.env.API_KEY;
            const omdbResponse = await axios.get(`http://www.omdbapi.com/?t=${title}&apikey=${omdbApiKey}`);

            if (omdbResponse.data.Response === "False") {
                return res.status(404).json({ msg: "Movie not found on OMDb." });
            }

            // Save the movie data to the Movie model
            movie = new movieModel({
                title: omdbResponse.data.Title,
                year: parseInt(omdbResponse.data.Year),
                rated: omdbResponse.data.Rated,
                released: new Date(omdbResponse.data.Released),
                genre: omdbResponse.data.Genre ? omdbResponse.data.Genre.split(", ").map(g => g.trim()) : [],
                director: omdbResponse.data.Director,
                actors: omdbResponse.data.Actors ? omdbResponse.data.Actors.split(", ").map(a => a.trim()) : [],
                language: omdbResponse.data.Language,
                country: omdbResponse.data.Country,
                released: omdbResponse.data.Released ? new Date(omdbResponse.data.Released) : null,
                imdbRating: omdbResponse.data.imdbRating ? parseFloat(omdbResponse.data.imdbRating) : null,
                type: omdbResponse.data.Type,
                boxOffice: omdbResponse.data.BoxOffice
            });

            await movie.save();
        }

        // Add the movie ID to the user's favorites
        const user = await userModel.findByIdAndUpdate(
            userId,
            { $addToSet: { favorites: movie._id } }, // Add only if not already present
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ msg: "User not found." });
        }

        return res.json({ msg: "Movie saved to favorites.", user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "An error occurred while processing your request.", error: error.message });
    }
});

router.get("/:userid/favmovies", async (req, res) => {
    const { userid } = req.params;

    try {
        // Find the user and populate the favorites with full movie data
        const userResponse = await userModel.findById(userid).populate("favorites");

        if (!userResponse) {
            return res.status(404).json({ msg: "User not found." });
        }

        // Send back the populated favorites array
        return res.json({ favorites: userResponse.favorites });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "An error occurred while fetching favorite movies." });
    }
});


module.exports = router;
