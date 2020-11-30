const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",

      data: {
        users,
      },
    });
  } catch (error) {
    console.log("Couldnt fetch users");
  }
};
