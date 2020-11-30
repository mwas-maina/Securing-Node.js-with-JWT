const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const userRoute = require("./userRoutes/userRoute");

app.use(express.json());
//Connecting with the database
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("connection established"));

//START OUR SERVER

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening at port:${port}`);
});

app.use("/api/users/", userRoute);

//
