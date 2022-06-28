const Mongoose = require("mongoose");
const { ObjectId } = Mongoose.Schema;

let Devices;

try {
  Devices = Mongoose.model("Devices");
} catch (e) {
    Devices = Mongoose.model(
    "Devices",
    new Mongoose.Schema({
        userId: {type: ObjectId, refer: "Users", required: true },
        alias: {type: String, require: false},
        entrada: {type: String, require: false},
        token: { type: String,},
    })
  );
}

module.exports = Devices;
