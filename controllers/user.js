const User = require("../models/User");
const bcrypt = require("bcrypt");

const editUser = async (req, res) => {
  const { _id, firstName, lastName, email, password, roninAddress, scholar } =
    req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    const user = await User.findByIdAndUpdate(_id, {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      roninAddress,
      scholar,
    });
    await user.save();
    res.json({ success: true, message: "Updated Sucessfully" });
  } catch (error) {
    res.json({ success: false, message: "error updating user" });
  }
};

const deleteUser = async (req, res) => {
  res.json({ message: "delete success" });
};

module.exports = { editUser, deleteUser };
