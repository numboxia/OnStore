const dashboardPage = (req, res) => {
  if (!req.session.user) return res.redirect("/auth/login");
  res.render("dashboard", { title: "Dashboard", user: req.session.user });
};

const logoutUser = (req, res) => {
  req.session.destroy(() => res.redirect("/"));
};

module.exports = { dashboardPage, logoutUser };
