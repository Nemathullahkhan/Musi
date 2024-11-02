const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        min: 1888, // Adding a reasonable lower limit for movie years
        max: new Date().getFullYear() // No future years
    },
    rated: {
        type: String
    },
    released: {
        type: Date
    },
    genre: {
        type: [String] // Array of strings
    },
    director: {
        type: String
    },
    actors: {
        type: [String] // Array of strings
    },
    language: {
        type: String
    },
    country: {
        type: String,
    },
    poster: {
        type: String
    },
    imdbRating: {
        type: Number, // Changed to Number
        min: 0,
        max: 10
    },
    type: {
        type: String
    },
    boxOffice: {
        type: String
    },
});

const movieModel = mongoose.model('Movie', movieSchema); // Use 'Movie' for singular model name

module.exports = movieModel;
