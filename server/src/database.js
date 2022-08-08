const mongoose = require("mongoose");



mongoose
  .connect("mongodb://localhost:/mean-employees")
  .then((db) => {
    console.log("db is connected");
  })
  .catch((err) => console.log(err));
