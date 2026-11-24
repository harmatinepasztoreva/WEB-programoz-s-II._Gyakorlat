require("dotenv").config();
const fs = require("fs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Gep = require("./models/Gep");
const Processzor = require("./models/Processzor");
const Oprendszer = require("./models/Oprendszer");
const User = require("./models/User");
const beolvas = (fajlnev) => {
  const data = fs.readFileSync(fajlnev, "utf8");
  const sorok = data.split("\n").map(sor => sor.replace("\r", "")).filter(sor => sor !== "");
  sorok.shift();
  return sorok.map(sor => sor.split("\t"));
};
const szam = (szoveg) => Number(szoveg.replace(",", "."));
const processzorok = beolvas("data/processzor.txt").map(s => ({id: szam(s[0]), gyarto: s[1], tipus: s[2]}));
const oprendszerek = beolvas("data/oprendszer.txt").map(s => ({id: szam(s[0]), nev: s[1]}));
const gepek = beolvas("data/gep.txt").map(s => ({gyarto: s[0], tipus: s[1], kijelzo: szam(s[2]), memoria: szam(s[3]), merevlemez: szam(s[4]), videovezerlo: s[5], ar: szam(s[6]), processzorid: szam(s[7]), oprendszerid: szam(s[8]), db: szam(s[9])}));
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connection established");
    await Processzor.deleteMany({});
    await Processzor.insertMany(processzorok);
    console.log("The processzor collection is uploaded: " + processzorok.length);
    await Oprendszer.deleteMany({});
    await Oprendszer.insertMany(oprendszerek);
    console.log("The oprendszer collection is uploaded: " + oprendszerek.length);
    await Gep.deleteMany({});
    await Gep.insertMany(gepek);
    console.log("The gep collection is uploaded: " + gepek.length);
    const admin = await User.findOne({ username: "admin" });
    if (!admin) {
      const hash = await bcrypt.hash("admin123", 10);
      await User.create({ username: "admin", password: hash, role: "admin" });
      console.log("Admin user created: admin / admin123");
    }
    await mongoose.connection.close();
  } catch (error) {
    console.error("Error:", error);
  }
};
seedDatabase();
