const express = require("express");

const auth = require("../controller/auth");
const user = require("../controller/user");

const router = express.Router();

router.route("/signup").post(auth.signup);

/* router.route("/api/users/signup").get(auth.signup); */

router.route("/getall").get(auth.protect, user.getAllUsers);

module.exports = router;

//Remember to import this router in Our app.js and use it as follows

//app.use(router)
