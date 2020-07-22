//MODULE IMPORTS
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//MODEL IMPORTS
const { User } = require("../models/user");

//ROUTER OBJECT INIT
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      return res.status(400).send("User Already Exists!");
    }

    user = new User(req.body);

    //Modify it to store a hashed password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    //Save the user to the Atlas Cluster
    const data = await user.save();
    const token = jwt.sign(
      {
        _id: data._id,
      },
      "jwtPrivateKey"
    );

    //Send the generated token back as a response
    return res.status(200).json({
      message: "SignUp Successful!",
      token: token,
    });
  } catch (err) {
    console.log("ERROR:: ", err);
  }
});

router.post("/login", async (req, res) => {
  try {
    // Validate Email
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(404).send("Invalid Email!");
    }

    // Validate Password
    const passwordVerify = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordVerify) {
      return res.status(404).send("Incorrect Password!");
    }

    //JWT Authentication
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "jwtPrivateKey"
    );

    //Send the token in the response header
    return res.status(200).json({ message: "Login Successful!", token: token });
  } catch (err) {
    console.log("ERROR:: ", err);
  }
});

module.exports = router;
