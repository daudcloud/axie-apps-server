const mongoose = require("mongoose");
const { isEmail } = require("validator");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      minLength: [3, "Your first name must be atleast 3 characters"],
      maxLength: [30, "Your first name is too long"],
      required: "First name is required",
    },
    lastName: {
      type: String,
      trim: true,
      minLength: [3, "Your last name must be atleast 3 characters"],
      maxLength: [30, "Your last name is too long"],
      required: "Last name is required",
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: "Email address is required",
      validate: [isEmail, "invalid email"],
      unique: true,
    },
    password: {
      type: String,
      minLength: [6, "Your Password must be atleast 6 characters"],
      required: true,
    },
    roninAddress: {
      type: String,
      trim: true,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
