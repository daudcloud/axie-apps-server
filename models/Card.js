const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema(
  {
    cardType: {
      type: String,
      required: true,
    },
    classType: {
      type: String,
      required: true,
      trim: true,
    },
    part: {
      type: String,
      required: true,
      trim: true,
    },
    partType: {
      type: String,
      required: true,
      trim: true,
    },
    energy: {
      type: Number,
      required: true,
      min: 0,
      max: 2,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    damage: {
      type: String,
      required: true,
      trim: true,
    },
    backgroundInfo: {
      type: String,
      required: true,
      trim: true,
    },
    defense: {
      type: String,
      required: true,
      trim: true,
    },
    backgroundCard: {
      type: String,
      required: true,
      trim: true,
    },
    attackImage: {
      type: String,
      required: true,
      trim: true,
    },
    defenseImage: {
      type: String,
      required: true,
      trim: true,
    },
    effectIcon: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Card", CardSchema);
