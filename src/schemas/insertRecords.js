const Mongoose = require("mongoose");
const { ObjectId } = Mongoose.Schema;

let InsertRecord;

try {
    InsertRecord = Mongoose.model("InsertRecord");
} catch (e) {
    InsertRecord = Mongoose.model(
        "InsertRecord",
        new Mongoose.Schema({
            userId: { type: ObjectId, refer: "Users", required: true },
            deviceId: { type: ObjectId, refer: "Devices", required: true },
            insertData: { type: Date, default: Date.now, required: true },
            metrics: { type: Array, required: true },
        })
    );
}

module.exports = { InsertRecord };
