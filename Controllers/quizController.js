let Quiz = require("../Model/quiz");
let bcrypt = require("bcrypt");

exports.getAllQuizes = async (req, res) => {
  Quiz.find()
    .then((response) => res.json(response))
    .catch((err) => console.log(err));
};

exports.getQuizById = (req, res, next) => {
  Quiz.findById(req.params.id)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => console.log(err));
};

exports.quizCreatePost = async (req, res, next) => {
  let quiz = new Quiz(req.body);

  let result = await Quiz.findOne({ quizTitle: quiz.quizTitle });
  if (result) {
    return res.status(403).send({ message: "Quiz Name Already Exists" });
  }
  if (quiz.quizPassword) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(quiz.quizPassword, salt, (err, hash) => {
        if (err) throw err;
        //password is hashed
        quiz.quizPassword = hash;
        quiz
          .save()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
  } else {
    quiz
      .save()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

exports.quizDelete = (req, res) => {
  let id = req.params.id;
  console.log(id);
  Quiz.findByIdAndDelete(id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
