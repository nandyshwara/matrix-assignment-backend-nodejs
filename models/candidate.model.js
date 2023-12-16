const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  candidateName: {
    type: String,
    required: true,
  },
  interviewStatus: {
    type: String,
    enum: ["Pending", "Completed"],
    required: true,
  },
  feedback: {
    type: String,
    required: function () {
      return this.interviewStatus === "Completed";
    },
  },
  rating: {
    type: Number,
    required: function () {
      return this.interviewStatus === "Completed";
    },
  },
});

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
