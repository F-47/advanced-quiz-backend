
let User = require('../Model/user')
let bcrypt = require('bcrypt')

exports.postRegister = (req, res) => {
  let { firstname, lastname, email, password, password2 } = req.body;
  let errors = []

  //check that all fields are filled
  if (!firstname || !lastname || !email || !password) {
    errors.push({ msg: "Please fill out all the fields" })
  }

  //check that both passwords matches
  if (password !== password2) {
    errors.push({ msg: "Passwords don't match" })
  }

  //check that password is at least 6 characters long
  if (password.length < 6) {
    errors.push({ msg: 'Passowrd should be at least 6 characters' })
  }

  //check if their is any errors 
  if (errors.length > 0) {
    res.json({ errors })
  } else {
    User.findOne({ email: email })
      .then(user => {
        errors.push({ msg: "Email is already registered" })
        if (user) {
          res.json({ errors })
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
}