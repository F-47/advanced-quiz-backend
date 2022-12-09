
let User = require('../Model/user')
let bcrypt = require('bcrypt')

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