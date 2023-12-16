const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function signupUser(req, res) {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      console.log("user already exists");
      return res.status(401).json({
        status: "fail",
        message: "User already exist!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    delete req.body.role;
    const newUser = await userModel.create({
      email,
      password: hashedPassword,
      role: "recruiter",
    });

    newUser.password = undefined;

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

    res.status(201).json({
      status: "success",
      message: "User created successfully!",
      data: {
        user: newUser,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user?.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid password",
      });
    }

    user.password = undefined;

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.status(200).json({
      status: "success",
      message: "User logged in successfully!",
      data: {
        user,
        token,
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
}


module.exports = {
    signupUser,
    loginUser,
}