let mongoose = require("mongoose");

let quizActivity = new mongoose.Schema({
  quizTitle: {
    type: String,
    required: true,
  },
  quizID: {
    type: String,
    required: true,
  },
  userAnswers: [Number],
  email: {
    type: String,
    required: true,
  },
});

let QuizActivity = mongoose.model("QuizActivity", quizActivity);

module.exports = QuizActivity;
