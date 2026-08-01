const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user.routes");
const { body } = require("express-validator");
const { User } = require("./models/user.models");
const { AuthMiddleware } = require("./middleware/Auth");
const multer = require("multer");
const { Postrouter } = require("./routes/post.routes");

const app = express();

app.use(express.json());

const Validation = [
  body("name")
    .isLength({ min: 6 })
    .withMessage("the name length should be minimum 6"),

  body("email")
    .exists()
    .withMessage("email should exist it is important")
    .custom(async (val) => {
      const u = await User.findOne({ email: val });
      if (u) {
        throw new Error("user already exists");
      }
    }),
];

app.get("/api/v1/auth", AuthMiddleware, async (req, res) => {
  res.json({ message: "to check Auth.js" });
});

app.use("/api/v1/data", Validation, router);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./uploads");
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/v1/upload", upload.single("profilepic"), async (req, res) => {
  res.json(req.file);
});

app.use("/api/v2/post", Postrouter);

module.exports = app;