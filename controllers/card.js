const Card = require("../models/Card");

const getCard = async (req, res) => {
  try {
    const cards = await Card.find().sort({
      classType: 1,
      partType: 1,
      name: 1,
    });
    res.status(200).json({ success: true, data: cards });
  } catch (error) {
    res.json({ success: false, message: "Inter server error" });
  }
};

const editCard = async (req, res) => {
  try {
    const id = req.params.id;
    const { energy, damage, defense, description } = req.body;
    await Card.findByIdAndUpdate(id, {
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
};

const addCard = async (req, res) => {
  try {
    const _card = await Card.find({ part: req.body.part }).exec();
    if (_card.length !== 0)
      return res.json({
        success: false,
        message: "Duplicated card not allowed",
      });
    const {
      cardType,
      classType,
      part,
      partType,
      energy,
      name,
      damage,
      defense,
      backgroundCard,
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
      defense,
      backgroundCard,
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

module.exports = { editCard, addCard, getCard };
