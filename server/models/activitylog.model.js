const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  logins: {
    type: Map,
    of: Number,
    default: {}
  }
}, { timestamps: true });

module.exports = mongoose.model("ActivityLog", activityLogSchema);