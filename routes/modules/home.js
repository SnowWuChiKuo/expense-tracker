const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
    .populate('categoryId') // mongoose populate:包含
    .lean()
    .then(records => {
      let totalAmount = 0
      records.map(record => {
        totalAmount += Number(record.amount)
      })
      return res.render('index', { records, totalAmount })
    })
})

router.post('/category', (req, res) => {
  const reqCategory = req.body.category
  const userId = req.user._id
  Category.find()
    .lean()
    .then(category => {
      const recordCategory = []
      const otherCategory = []
      category.map(category => {
        if (category.name === reqCategory) {
          return recordCategory.push(category)
        } else {
          return otherCategory.push(category)
        }
      })
      Record.find({ userId, categoryId: recordCategory[0]._id })
        .populate('categoryId')
        .lean()
        .then(records => {
          let totalAmount = 0
          records.map(record => totalAmount += Number(record.amount))
          res.render('index', { records, totalAmount, recordCategory: recordCategory[0], otherCategory })
        })
    })
})

module.exports = router