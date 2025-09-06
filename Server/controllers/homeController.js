const homePage = (req, res) => {
  res.render("home", {
    title: "Home",
    user: req.session.user || null,
    games: [
      { _id: 1, title: "Game A", description: "An epic adventure", image: "/images/game-a.jpg" },
      { _id: 2, title: "Game B", description: "A puzzle challenge", image: "/images/game-b.jpg" }
    ]
  });
};

module.exports = { homePage };
