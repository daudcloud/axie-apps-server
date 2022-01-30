const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email.toLowerCase(),
    }).exec();
    if (!user)
      return res.json({
        success: false,
        message: "invalid email or wrong password",
      });

    const authenticated = bcrypt.compareSync(req.body.password, user.password);
    if (!authenticated)
      return res.json({
        success: false,
        message: "invalid email or wrong password",
      });

    const _user = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      roninAddress: user.roninAddress,
      role: user.role,
      scholar: user.scholar,
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
      success: true,
      message: "login successfully",
      token,
    });
  } catch (error) {
    // console.log(error);
    return res.json({ success: false, message: "error login" });
  }
};

const register = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email.toLowerCase(),
    }).exec();
    if (user)
      return res.json({ success: false, message: "email already registered" });
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const instance = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      roninAddress: req.body.roninAddress,
    });
    await instance.save();
    return res
      .status(201)
      .json({ success: true, message: "registered successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "error register" });
  }
};

module.exports = {
  login,
  register,
};
