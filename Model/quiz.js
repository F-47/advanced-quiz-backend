const mongoose = require("mongoose");

quizSchema = new mongoose.Schema({
  quizTitle:{
    type:String,
    required:true
  },
  quizDesc:{
    type:String,
    required:true
  },
  questions:[
    {question:String,answerOptions:[{answerText:String,isCorrect:false}]},
  ],
  quizPassword:{
    type:String,
    required:false
  },
  quizTime:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model("Quiz", quizSchema);
