const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      return res
        .status(401)
        .json({ success: false, message: "You are not authorized" });
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const isExist = await User.findById(user._id);
    if (!isExist)
      return res
        .status(401)
        .json({ success: false, message: "You are not authorized" });
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const isOwner = (req, res, next) => {
  if (!req.headers.authorization)
    return res
      .status(401)
      .json({ success: false, message: "You are not allowed to delete data" });
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);
  const isAllowed = user._user.role === "developer";
  if (!isAllowed)
    return res
      .status(401)
      .json({ success: false, message: "You are not allowed to delete datas" });
  next();
};

module.exports = { isAuthenticated, isOwner };
