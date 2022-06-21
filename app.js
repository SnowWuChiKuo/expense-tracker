const express = require('express')
const exphbs = require('express-handlebars')

const mongoose = require('mongoose')
const MONGODB_URI = "mongodb://localhost/expense-tracker"
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 取得連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

const app = express()
const PORT = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`)
})