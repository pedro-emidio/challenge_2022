const mongoose = require("mongoose");

let db = null;

async function conectdb() {
  if (db == null) {
    db = await mongoose.connect(`${process.env.DBHOST}/test`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
     return db;
  } else {
    return db;
  }
}

module.exports = conectdb;