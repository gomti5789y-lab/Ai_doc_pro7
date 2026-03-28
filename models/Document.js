const mongoose = require("mongoose");

module.exports = mongoose.model("Document", {
  userId: String,
  text: String,
  summary: String,
});
