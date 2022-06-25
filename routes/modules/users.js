const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')


// 登入頁瀏覽
router.get('/login', (req, res) => {
  res.render('login')
})

// 登入驗證
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// 註冊頁瀏覽
router.get('/register', (req, res) => {
  res.render('register')
})

// 註冊頁功能
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('User already exists.')
        res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        return User.create({
          name,
          email,
          password
        })
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
})

module.exports = router