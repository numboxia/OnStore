const express = require("express");
const router = express.Router();
const { purchaseGame } = require("../controllers/purchaseController");

router.post("/", purchaseGame);

module.exports = router;
