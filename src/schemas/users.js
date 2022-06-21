const Mongoose = require("mongoose");

let Users;
try {
  Users = Mongoose.model("Users");
} catch (e) {
  Users = Mongoose.model(
    "Users",
    new Mongoose.Schema({
      userName: { type: String, require: true },
      password: { type: String, require: true },
    })
  );
}

module.exports = Users;
