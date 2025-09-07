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

const connectWallet = async (req, res) => {
  const { walletAddress } = req.body;
  
  if (!walletAddress) {
    return res.status(400).json({ success: false, error: 'No wallet address provided' });
  }

  try {
    // Store wallet address in session
    req.session.walletAddress = walletAddress;
    
    // If user is logged in, update their wallet address
    if (req.session.user) {
      await User.findByIdAndUpdate(req.session.user.id, { walletAddress });
    }

    res.json({ success: true, message: 'Wallet connected successfully' });
  } catch (error) {
    console.error('Error connecting wallet:', error);
    res.status(500).json({ success: false, error: 'Failed to connect wallet' });
  }
};

module.exports = {
  loginPage,
  registerPage,
  loginUser,
  registerUser,
  connectWallet
};
