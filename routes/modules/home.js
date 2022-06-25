const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

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

module.exports = router