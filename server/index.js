const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const docRoutes = require("./routes/doc");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log("MongoDB Connected"));

app.use("/api/auth", authRoutes);
app.use("/api/doc", docRoutes);

app.listen(5000, ()=>console.log("Server running"));
