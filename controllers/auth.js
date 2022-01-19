const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email.toLowerCase(),
    }).exec();
    const authenticated = bcrypt.compareSync(req.body.password, user.password);
    if (!user) return res.json({ message: "something went wrong" });
    if (!authenticated) return res.json({ message: "something went wrong" });
    _user = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roninAddress: user.roninAddress,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    const token = jwt.sign(
      {
        _user,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30m" }
    );
    return res.status(200).json({
      message: "success login",
      user: _user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: "error login" });
  }
};

const register = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email.toLowerCase(),
    }).exec();
    if (user) return res.json({ message: "email registered" });
    const hashedPassword = bcrypt.hashSync(
      req.body.password,
      process.env.SALT_ROUNDS
    );
    const instance = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      roninAddress: req.body.roninAddress,
    });
    await instance.save();
    return res.status(201).json({ message: "success register" });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.errors });
  }
};

module.exports = {
  login,
  register,
};
