const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/sign-up", async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const existingUser = await User.findOne({ userName: userName });
    const existingEmail = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists!" });
    } else if (userName.length < 4) {
      return res
        .status(400)
        .json({ message: "Username should have at least 4 characters!" });
    }

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName: userName,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    return res
      .status(200)
      .json({ message: "Your account has been created successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/sign-in", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const existingUser = await User.findOne({ userName: userName });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    bcrypt.compare(password, existingUser.password, (err, data) => {
      if (data) {
        // Generating JWT
        const authClaims = {
          userName: userName,
          email: existingUser.email, // Add email to the claims
          jti: jwt.sign({}, process.env.JWT_SECRET),
        };
        const token = jwt.sign({ authClaims }, process.env.JWT_SECRET, {
          expiresIn: "2d",
        });
        res.status(200).json({ id: existingUser._id, token: token });
      } else {
        return res.status(400).json({ message: "Invalid credentials!" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
