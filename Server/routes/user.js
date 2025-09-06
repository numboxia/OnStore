const express = require("express");
const router = express.Router();
const { dashboardPage, logoutUser } = require("../controllers/userController");

router.get("/dashboard", dashboardPage);
router.get("/logout", logoutUser);

module.exports = router;
