const express = require("express");
const { editCard, addCard } = require("../controllers/card");

const router = express.Router();

router.put("/:id/edit", editCard);
router.post("/add", addCard);

module.exports = router;
