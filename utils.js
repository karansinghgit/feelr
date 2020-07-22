const jwt = require("jsonwebtoken");

const auth = function (req, res, next) {
  //Receive the token
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send("Access Denied. Token Missing!");
  }
  //verify and get the user
  try {
    const decoded = jwt.verify(token, "jwtPrivateKey");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).send("Access Denied!");
  }
};

module.exports = {
  auth: auth,
};
