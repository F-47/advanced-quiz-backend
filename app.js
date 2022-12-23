let express = require('express');
let mongoose = require('mongoose')
let bodyParser = require('body-parser');
const quizController = require("./Controllers/quizController");
const userController = require("./Controllers/userController");
const quizActivityController = require("./Controllers/quizActivityController");
require('dotenv').config()

let app = express();
let port = process.env.PORT || 3333;

app.use(bodyParser.json());

//create mongodb
let dbURI = process.env.MONGO_DB_URL
mongoose.connect(dbURI)
    .then(() => console.log("Database connected!"))
    .catch((err)=>console.log(err))

//middleware and static files
app.use(express.static('public')) // we can access any file in the public folder
app.use(express.urlencoded({extended:true})) // so we can access the data coming from the input value

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get("/quiz", quizController.getAllQuizes);
app.get("/quiz/:id", quizController.getQuizById);
app.post('/quiz', quizController.quizCreatePost)
app.delete('/quiz/:id',quizController.quizDelete)
app.post('/signup',userController.postRegister)
app.post('/login',userController.postLogin)
app.delete('/user/:id',userController.userDelete)
app.get('/profile/:token',userController.profile)
app.post('/quizActivity',quizActivityController.postUserActivity)
app.post('/quizActivity/:quizID',quizActivityController.getUserActivity)

app.listen(port, () => {
    console.log(`conected with port ${port}`);
  });
