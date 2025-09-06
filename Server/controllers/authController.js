const User = require("../models/User");

const loginPage = (req, res) => {
  res.render("auth", { title: "Login", activeTab: "login", user: req.session.user || null });
};

const registerPage = (req, res) => {
  res.render("auth", { title: "Register", activeTab: "register", user: req.session.user || null });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.render("auth", { title: "Login", activeTab: "login", error: "User not found" });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.render("auth", { title: "Login", activeTab: "login", error: "Invalid credentials" });

  req.session.user = { id: user._id, username: user.username, email: user.email };
  res.redirect("/user/dashboard");
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.render("auth", { title: "Register", activeTab: "register", error: "Email already exists" });
    }
    const newUser = new User({ username, email, password });
    await newUser.save();
    req.session.user = { id: newUser._id, username: newUser.username, email: newUser.email };
    res.redirect("/user/dashboard");
  } catch (err) {
    res.render("auth", { title: "Register", activeTab: "register", error: "Registration failed" });
  }
};

module.exports = {
  loginPage,
  registerPage,
  loginUser,
  registerUser
};
