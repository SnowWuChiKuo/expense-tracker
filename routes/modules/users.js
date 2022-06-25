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
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: '這個 Email 已經註冊過了。' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    return User.create({
      name,
      email,
      password
    })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
})

// 登出路由
router.get('/logout', (req, res) => {
  req.logOut()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})


module.exports = router