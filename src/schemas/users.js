const Mongoose = require("mongoose");

let Users;
try {
  Users = Mongoose.model("Users");
} catch (e) {
  Users = Mongoose.model(
    "Users",
    new Mongoose.Schema({
      name: { type: String, require: true },
      password: { type: String, require: true },
      email: {type: String, required: true, unique: true}
    })
  );
}

module.exports = {Users};
