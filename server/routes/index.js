const express = require("express");
const router = express.Router();
const userRouter = require("./User.js");
const movieRouter = require("./Movie.js")

router.use("/user",userRouter);
router.use("/movies",movieRouter);
module.exports = router;
