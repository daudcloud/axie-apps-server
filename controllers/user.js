const User = require("../models/User");
const bcrypt = require("bcrypt");
const { findByIdAndDelete } = require("../models/User");

const editUser = async (req, res) => {
  const { _id, firstName, lastName, email, password, roninAddress, scholar } =
    req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    await User.findByIdAndUpdate(_id, {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      roninAddress,
      scholar,
    });
    res.json({ success: true, message: "Updated Successfully" });
  } catch (error) {
    res.json({ success: false, message: "error updating user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.json({ success: true, message: "Deleted Successfully" });
  } catch (error) {
    res.json({ success: false, message: "Internal server error" });
  }
  res.json({ message: "delete success" });
};

module.exports = { editUser, deleteUser };
