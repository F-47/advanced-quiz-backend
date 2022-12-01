let express = require('express');
let mongoose = require('mongoose')
let bodyParser = require('body-parser');
const quizController = require("./Controllers/quizController");
let app = express();

app.use(bodyParser.json());

//create mongodb
let dbURI = 'mongodb+srv://fares:Abomadawy12@Quizes.jnwjcua.mongodb.net/QuizApp'
mongoose.connect(dbURI)
    .then(() => console.log("Database connected!"))
    .catch((err)=>console.log(err))

//register view engine
app.set('view engine', 'ejs') // app.set('views','views2') // to change directory 

//middleware and static files
app.use(express.static('public')) // we can access any file in the public folder
app.use(express.urlencoded({extended:true})) // so we can access the data coming from the input value

app.get("/getAllQuizes", quizController.getAllQuizes);
app.get("/quiz/:id", quizController.getQuizById);
app.post('/createQuiz', quizController.quizCreatePost)

app.listen(4000, () => {
    console.log(`conected with port 4000`);
  });