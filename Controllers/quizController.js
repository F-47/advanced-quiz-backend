let Quiz = require("../Model/quiz");

exports.getAllQuizes = async (req, res) => {
  Quiz.find()
    .then((response)=>res.json(response))
    .catch((err)=>console.log(err))
};

exports.getQuizById = (req, res, next) => {
  Quiz.findById(req.params.id)
    .then((response)=>{res.json(response)})
    .catch((err)=>console.log(err))
}

exports.quizCreatePost = (req, res, next) => {
  let quiz = new Quiz(req.body);
  quiz
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.quizDelete = (req, res) => {
  let id = req.params.id;
  Quiz.findByIdAndDelete(id)
      .then((result) => {
          res.json(result)
      })
      .catch(err => {
          console.log(err)
      })
}