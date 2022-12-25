let mongoose = require("mongoose");

let quizActivity = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  quiz: {
    quizTitle:{
      type: String,
      required: true,
    },
    quizID: {
      type: String,
      required: true,
    },
    userAnswers: [Number],
  },
});

let QuizActivity = mongoose.model("QuizActivity", quizActivity);

module.exports = QuizActivity;