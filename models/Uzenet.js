const mongoose = require("mongoose");
const uzenetSchema = new mongoose.Schema(
  {
    nev: {
      type: String,
      required: [true, "A név megadása kötelező!"],
      minlength: [3, "A név legalább 3 karakter legyen!"]
    },
    email: {
      type: String,
      required: [true, "Az e-mail cím megadása kötelező!"],
      match: [/^\S+@\S+\.\S+$/, "Érvényes e-mail címet adjon meg!"]
    },
    targy: {
      type: String,
      required: [true, "A tárgy megadása kötelező!"],
      minlength: [3, "A tárgy legalább 3 karakter legyen!"]
    },
    uzenet: {
      type: String,
      required: [true, "Az üzenet megadása kötelező!"],
      minlength: [10, "Az üzenet legalább 10 karakter legyen!"]
    },
    datum: {type: Date, default: Date.now}
  },
  {
    collection: "uzenetek",
    versionKey: false
  }
);
module.exports = mongoose.model("Uzenet", uzenetSchema);
