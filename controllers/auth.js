const User = require("../models/User");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) return res.json({ message: "something went wrong" });
    const password = bcrypt.compareSync(req.body.password, user.password);
    if (!password) return res.json({ message: "something went wrong" });
    return res.status(201).json({ message: "success login" });
  } catch (error) {
    console.log(error);
    res.json({ message: "error login" });
  }
};

const register = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (user) return res.json({ message: "email registered" });
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
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
    res.json({ message: "error register" });
  }
};

module.exports = {
  login,
  register,
};
