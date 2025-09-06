const express = require("express");
const path = require("path");
const session = require("express-session");
const mongoose = require("mongoose");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const indexRoutes = require("./Server/routes/index");
const authRoutes = require("./Server/routes/auth");
const userRoutes = require("./Server/routes/user");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || "supersecret",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 2 }
}));

app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "Page Not Found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("500", { title: "Server Error", error: err });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
