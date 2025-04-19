const mongoose = require("mongoose");

const customListSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  questions: [{
    type: String
  }],
  userEmail: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("CustomList", customListSchema);