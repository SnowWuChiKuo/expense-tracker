if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Category = require('../category')
const User = require('../user')
const Record = require('../record')
const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')


const SEED_USER1 = {
  name: '廣志',
  email: 'user1@example.com',
  password: '12345678',
  records: [
    {
      name: '午餐',
      date: '2019-04-23',
      amount: 60,
      category: "餐飲食品"
    },
    {
      name: '晚餐',
      date: '2019-04-23',
      amount: 60,
      category: "餐飲食品"
    },
    {
      name: '捷運',
      date: '2019-04-23',
      amount: 120,
      category: "交通出行"
    },
    {
      name: '租金',
      date: '2015-04-01',
      amount: 25000,
      category: "家居物業"
    }
  ]
}
const SEED_USER2 = {
  name: '小新',
  email: 'user2@example.com',
  password: '12345678',
  records: [
    {
      name: '電影：驚奇隊長',
      date: '2019-04-19',
      amount: 220,
      category: "休閒娛樂"
    }
  ]
}

db.once('open', () => {
  return bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER1.password, salt))
    .then(hash => User.create({
      name: SEED_USER1.name,
      email: SEED_USER1.email,
      password: hash
    }))
    .then(user => {
      return Promise.all(Array.from(SEED_USER1.records, record => {
        return Category
          .findOne({ name: record.category })
          .lean()
          .then(category => {
            return Record.create({
              name: record.name,
              date: record.date,
              amount: record.amount,
              userId: user._id,
              categoryId: category._id
            })
          })
      }))
    })
    .then(() => {
      console.log('SEED_USER1 done!')
    })
})

db.once('open', () => {
  return bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER2.password, salt))
    .then(hash => User.create({
      name: SEED_USER2.name,
      email: SEED_USER2.email,
      password: hash
    }))
    .then(user => {
      return Promise.all(Array.from(SEED_USER2.records, record => {
        return Category
          .findOne({ name: record.category })
          .lean()
          .then(category => {
            return Record.create({
              name: record.name,
              date: record.date,
              amount: record.amount,
              userId: user._id,
              categoryId: category._id
            })
          })
      }))
    })
    .then(() => {
      console.log('SEED_USER2 done!')
      process.exit()
    })
})