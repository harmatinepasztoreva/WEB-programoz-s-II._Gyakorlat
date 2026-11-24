const mongoose = require("mongoose");
const gepSchema = new mongoose.Schema(
  {
    gyarto: {type: String, required: true},
    tipus: {type: String, required: true},
    kijelzo: {type: Number, required: true},
    memoria: {type: Number, required: true},
    merevlemez: {type: Number, required: true},
    videovezerlo: {type: String, required: true},
    ar: {type: Number, required: true},
    processzorid: {type: Number, required: true},
    oprendszerid: {type: Number, required: true},
    db: {type: Number, required: true}
  },
  {
    collection: "gep",
    versionKey: false
  }
);
module.exports = mongoose.model("Gep", gepSchema);
