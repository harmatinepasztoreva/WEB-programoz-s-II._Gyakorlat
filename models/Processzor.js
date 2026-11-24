const mongoose = require("mongoose");
const processzorSchema = new mongoose.Schema(
  {
    id: {type: Number, required: true},
    gyarto: {type: String, required: true},
    tipus: {type: String, required: true}
  },
  {
    collection: "processzor",
    versionKey: false
  }
);
module.exports = mongoose.model("Processzor", processzorSchema);
