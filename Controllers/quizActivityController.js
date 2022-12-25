let QuizActivity = require("../Model/quizActivity");

exports.postUserActivity = (req, res) => {
  let { quiz, token } = req.body;
  let newQuizActivity = new QuizActivity({ quiz, token });
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
  QuizActivity.findOne({ quizID, token })
    .then((response) => res.json(response))
    .catch((err) => console.log(err));
};
