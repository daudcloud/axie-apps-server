const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuthenticated = (req, res, next) => {
  if (!req.headers.authorization)
    return res
      .status(401)
      .json({ success: false, message: "You are not authorized" });
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.JWT_SECRET, "invalid token");
  const isExist = User.findById(user._id);
  if (!isExist)
    return res
      .status(401)
      .json({ success: false, message: "You are not authorizeds" });
  next();
};

module.exports = isAuthenticated;
