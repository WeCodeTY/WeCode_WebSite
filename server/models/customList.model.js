const mongoose = require("mongoose");

const customListSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  questions: [{
    type: String
  }],
  user: {   // <-- Correct
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("CustomList", customListSchema);