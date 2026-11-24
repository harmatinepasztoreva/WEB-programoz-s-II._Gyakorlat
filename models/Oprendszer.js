const mongoose = require("mongoose");
const oprendszerSchema = new mongoose.Schema(
  {
    id: {type: Number, required: true},
    nev: {type: String, required: true}
  },
  {
    collection: "oprendszer",
    versionKey: false
  }
);
module.exports = mongoose.model("Oprendszer", oprendszerSchema);
