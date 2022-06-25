const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const records = require('./modules/records')
const auth = require('./modules/auth')
const users = require('./modules/users')

router.use('/', home)
router.use('/records', records)
router.use('/users', users)
router.use('/auth', auth)

module.exports = router