const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const Jtoken = (id) => jwt.sign({ id }, process.env.SECRET_KEY);

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = Jtoken(newUser._id);

    res.status(200).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: "An error occured.Make sure your email is unique",
    });
  }
};

exports.protect = async (req, res, next) => {
  //check the token in headers by first checking whether it exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "login please to gain access",
    });
  }
  //Verifying the token to check its integrity
  const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return res.status(401).json({
      status: "fail",
      message: "User doesnt exist.Might be deleted lately!",
    });
  }
  next();
};
