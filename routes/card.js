const express = require("express");
const { getCard, editCard, addCard } = require("../controllers/card");

const router = express.Router();

router.get("/", getCard);
router.put("/:id/edit", editCard);
router.post("/add", addCard);

module.exports = router;
