
let User = require('../Model/user')
let bcrypt = require('bcrypt')
let jwt = require("jsonwebtoken")
let JWT_SECRET = "as23re32523wrwer1@wer3#24324!()*asd^asdt3"

exports.postRegister = (req, res) => {
  let { firstname, lastname, email, password } = req.body;
  let errors = []
    User.findOne({ email: email })
      .then(user => {
        errors.push({ msg: "Email is already registered" })
        if (user) {
          res.status(409).json({ errors });
        } else {
          // if user doesn't exist create new one
          let newUser = new User({ firstname, lastname, email, password })
          //crypt password
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err
              //password is hashed 
              newUser.password = hash
              //SaveUser
              newUser.save()
                .then(user => {
                  res.json({ user })
                })
                .catch(err => console.log(err))
            })
          })
        }
      })
}
exports.postLogin = async(req, res) => {
  let {email,password} = req.body
  let user = await User.findOne({email})
  if(!email && !password){
    return res.json({ msg: "Please fill out all the fields" });
  }
  if(!user){
    return res.json({ msg: "Email is not registered" });
  }
  if(await bcrypt.compare(password,user.password)){
    let token = jwt.sign({email:user.email},JWT_SECRET);

    if(res.status(201)){
      return res.json({status:"ok",data:token})
    }else{
      return res.json({msg:"error"})
    }
  }
  res.json({status:"error",msg:"Incorrect Password"})
}
exports.profile = async(req, res) => {
  let {token} = req.body
  try{
    let user = jwt.verify(token,JWT_SECRET)
    let userEmail = user.email
    User.findOne({email:userEmail})
      .then((data)=>res.send({status:"ok",data}))
      .catch((err)=>res.send({status:"error",data:err}))
  }catch(error){
    console.log(error)
  }
}