const mongoose = require("mongoose");

const userFeelrPairSchema = mongoose.Schema({
  userObj: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  feelrObj: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "feelr",
  },
});

module.exports = {
  UserFeelrPair: mongoose.model("userfeelrpair", userFeelrPairSchema),
};
