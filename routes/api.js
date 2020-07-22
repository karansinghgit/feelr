//MODULE IMPORTS
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//MODEL IMPORTS
const { Feelr } = require("../models/feelr");
const { Topic } = require("../models/topic");
const { UserFeelrPair } = require("../models/userFeelrPair");

const { auth } = require("../utils");
//ROUTER OBJECT INIT
const router = express.Router();

router.get("/viewTop", [auth], async (req, res) => {
  try {
    limit = 20;
    responses = [];
    const data = await Feelr.find({}).sort("-createdAt");
    for (var i = 0; i < data.length; i++) {
      var exists = await UserFeelrPair.exists({
        userObj: req.user._id,
        feelrObj: data[i]._id,
      });
      if (!exists) {
        responses.push(data[i]);
      }

      if (responses.length > limit) break;
    }

    for (var i = 0; i < responses.length; i++) {
      const seen = new UserFeelrPair();
      seen.userObj = req.user;
      seen.feelrObj = responses[i]._id;
      await seen.save();
    }

    return res.status(200).send(responses);
  } catch {
    console.log("ERROR:: ", err);
    return res.status(403).json({
      message: "Unknown Error!",
    });
  }
});

router.post("/createFeelr", [auth], async (req, res) => {
  try {
    var topic = await Topic.findOne({
      name: req.body.topic,
    });

    if (!topic) {
      var tempTopic = new Topic();
      tempTopic.name = req.body.topic;
      topic = await tempTopic.save();
    }

    const feelr = new Feelr();
    feelr.sentence = req.body.sentence;
    feelr.blankIndex = req.body.blankIndex;
    feelr.topicObj = topic._id;
    const feelrData = await feelr.save();
    res.status(200).send(feelrData);
  } catch (err) {
    console.log("ERROR:: ", err);
    return res.status(403).json({
      message: "An Error Occured!",
    });
  }
});

module.exports = router;
