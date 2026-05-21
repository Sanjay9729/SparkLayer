const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  shop: {
    type: String,
    required: true,
  },
  sessionToken: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400, // Auto-delete after 24 hours
  },
});

module.exports = mongoose.model("Session", sessionSchema);
