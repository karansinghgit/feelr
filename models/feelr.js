const mongoose = require("mongoose");

const feelrSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  sentence: {
    type: String,
    required: true,
  },
  blankIndex: {
    type: Number,
    required: true,
  },
  topicObj: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
  },
});

module.exports = {
  Feelr: mongoose.model("feelr", feelrSchema),
};
