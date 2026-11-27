const mongoose = require("mongoose");
const gepSchema = new mongoose.Schema(
  {
    gyarto: {
      type: String,
      required: [true, "A gyártó megadása kötelező!"],
      minlength: [2, "A gyártó legalább 2 karakter legyen!"]
    },
    tipus: {
      type: String,
      required: [true, "A típus megadása kötelező!"],
      minlength: [3, "A típus legalább 3 karakter legyen!"]
    },
    kijelzo: {
      type: Number,
      required: [true, "A kijelző méretének megadása kötelező!"],
      min: [7, "A kijelző legalább 7 hüvelyk legyen!"],
      max: [21, "A kijelző legfeljebb 21 hüvelyk lehet!"]
    },
    memoria: {
      type: Number,
      required: [true, "A memória megadása kötelező!"],
      min: [256, "A memória legalább 256 MB legyen!"]
    },
    merevlemez: {
      type: Number,
      required: [true, "A merevlemez méretének megadása kötelező!"],
      min: [1, "A merevlemez legalább 1 GB legyen!"]
    },
    videovezerlo: {
      type: String,
      required: [true, "A videovezérlő megadása kötelező!"],
      minlength: [3, "A videovezérlő legalább 3 karakter legyen!"]
    },
    ar: {
      type: Number,
      required: [true, "Az ár megadása kötelező!"],
      min: [1, "Az ár legalább 1 Ft legyen!"]
    },
    processzorid: {type: Number, required: [true, "A processzor kiválasztása kötelező!"]},
    oprendszerid: {type: Number, required: [true, "Az operációs rendszer kiválasztása kötelező!"]},
    db: {
      type: Number,
      required: [true, "A darabszám megadása kötelező!"],
      min: [0, "A darabszám nem lehet negatív!"]
    }
  },
  {
    collection: "gep",
    versionKey: false
  }
);
module.exports = mongoose.model("Gep", gepSchema);
