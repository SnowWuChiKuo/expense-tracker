const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const { name, category, date, amount } = req.body
  const userId = req.user._id
  Category.findOne({ category })
    .lean()
    .then(category => {
      return Record.create({
        name,
        date,
        amount,
        userId,
        categoryId: category._id
      })
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router