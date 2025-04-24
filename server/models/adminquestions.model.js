const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  revision: {
    type: Number,
    default: 0,
  },
  important: {
    type: Boolean,
    default: false,
  },
  link: {
    type: String,
    required: true,
  },
  problemStatement: {
    type: String,
    required: true,
  },
  sampleInput: {
    type: String,
    required: true,
  },
  sampleOutput: {
    type: String,
    required: true,
  },
  constraints: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Problem", problemSchema);