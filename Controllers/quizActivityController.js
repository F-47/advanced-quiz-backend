let QuizActivity = require("../Model/quizActivity");
let jwt = require("jsonwebtoken");
let JWT_SECRET = "as23re32523wrwer1@wer3#24324!()*asd^asdt3";

exports.postUserActivity = (req, res) => {
  let { quizTitle,quizID,userAnswers, email } = req.body;
  let newQuizActivity = new QuizActivity({ quizTitle,quizID,userAnswers, email });
  //SaveUser
  newQuizActivity
    .save()
    .then((quizActivity) => {
      res.json({ quizActivity });
    })
    .catch((err) => console.log(err));
};

exports.getUserActivity = (req, res) => {
  let quizID = req.params.quizID;
  let token = req.body.token;
  let user = jwt.verify(token, JWT_SECRET);
  let userEmail = user.email;
  QuizActivity.findOne({ quizID, email: userEmail })
    .then((response) => res.json(response))
    .catch((err) => console.log(err));
};
