let QuizActivity = require("../Model/quizActivity");

exports.postUserActivity = (req, res) => {
  let { quizID, token, userAnswers } = req.body;
  let newQuizActivity = new QuizActivity({ quizID, token, userAnswers });
  //SaveUser
  newQuizActivity.save()
    .then((quizActivity) => {
      res.json({ quizActivity });
    })
    .catch((err) => console.log(err));
};
exports.getUserActivity = (req, res) => {
    let quizID = req.params.quizID
    let token = req.body.token
    QuizActivity.findOne({quizID,token})
    .then((response) => res.json(response))
    .catch((err) => console.log(err));
};
