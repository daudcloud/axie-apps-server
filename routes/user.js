const express = require("express");
const { editUser, deleteUser } = require("../controllers/user");
const { isAuthenticated, isOwner } = require("../middlewares/user");

const router = express.Router();

router.put("/edit", isAuthenticated, editUser);
router.delete("/delete/:id", isOwner, deleteUser);

module.exports = router;
