const User = require("../models/User");

const editCard = async (req, res) => {
  try {
    const id = req.params.id;
    const { energy, damage, defense, description } = req.body;
    await User.findByIdAndUpdate(id, {
      energy,
      damage,
      defense,
      description,
    });
    res.json({ success: true, message: "Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal server error" });
  }
  res.json({ message: "delete success" });
};

const addCard = async (req, res) => {
  try {
    const {
      cardType,
      classType,
      part,
      partType,
      energy,
      name,
      damage,
      backgroundInfo,
      defense,
      backgroundCard,
      attackImage,
      defenseImage,
      effectIcon,
      description,
    } = req.body;
    const card = new Card({
      cardType,
      classType,
      part,
      partType,
      energy,
      name,
      damage,
      backgroundInfo,
      defense,
      backgroundCard,
      attackImage,
      defenseImage,
      effectIcon,
      description,
    });
    await card.save();
    res.json({ success: true, message: "Added card successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { editCard, addCard };
