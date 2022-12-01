let express = require('express');
let mongoose = require('mongoose')
let bodyParser = require('body-parser');
const quizController = require("./Controllers/quizController");
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

app.get("/quiz", quizController.getAllQuizes);
app.get("/quiz/:id", quizController.getQuizById);
app.post('/quiz', quizController.quizCreatePost)

app.listen(port, () => {
    console.log(`conected with port ${port}`);
  });