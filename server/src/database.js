const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost", { dbName: 'mean-employees', user: 'mongo', pass: 'm0ng01234' })
  .then((db) => {
    console.log("db is connected");
  })
  .catch((err) => console.log(err));
