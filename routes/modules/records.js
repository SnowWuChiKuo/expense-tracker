const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const { name, category, date, amount } = req.body
  const userId = req.user._id
  Category.findOne({ name: category })
    .lean()
    .then(category => {
      Record.create({
        name,
        date,
        amount,
        userId,
        category: category.name,
        categoryId: category._id,
        icon: category.icon
      })
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {
  const editId = req.params.id
  Record.findById(editId)
    .populate('categoryId')
    .lean()
    .then(record => {
      const recordCategory = record.categoryId.name
      const otherCategory = []
      Category.find()
        .then(categories => {
          categories.filter(category => {
            if (category.name !== recordCategory) {
              return otherCategory.push(category.name)
            }
          })
        })
        .then(() => res.render('edit', { record, recordCategory, otherCategory }))
    })
    .catch(error => console.log(error))
})

router.put('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, category, date, amount } = req.body
  Category.findOne({ name: category })
    .lean()
    .then(category => {
      if (category === null) {
        req.flash('warning_msg', '請點選類別欄位')
        return res.redirect(`/records/${_id}/edit`)
      }
      Record.findOne({ userId, _id })
        .then(record => {
          record.name = name,
          record.date = date,
          record.amount = amount,
          record.categoryId = category._id
          return record.save()
        })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
})

module.exports = router