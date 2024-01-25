// controller.js
const User = require("../models/user-model");
const bcrypt = require("bcrypt");

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to the home page using router");
  } catch (error) {
    console.log(error);
  }
};

// register logic

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ msg: "Email is already in use" });
    }

    const userCreated = await User.create({ username, email, phone, password });
    res
      .status(200)
      .json({
        message: "registration successful",
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

// login logic

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    console.log(userExist);

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    // const user = await bcrypt.compare(password, userExist.password)
    const user = await userExist.comparePassword(password);

    if (user) {
      res.status(200).json({
        msg: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "invalid email or password" });
    }
  } catch (error) {
    // res.status(500).json('internal server error')
    next(error);
  }
};

module.exports = { home, register, login };
