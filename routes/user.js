const express = require("express");
const { editUser, deleteUser } = require("../controllers/user");
const isAuthenticated = require("../middlewares/user");

const router = express.Router();

router.put("/edit", isAuthenticated, editUser);
router.delete("/delete", deleteUser);

module.exports = router;
