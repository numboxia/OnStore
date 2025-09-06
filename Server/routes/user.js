const express = require("express");
const router = express.Router();

router.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/auth/login");
  }
  res.render("dashboard", { title: "User Dashboard", user: req.session.user });
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
