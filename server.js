const express = require('express')
const mongoose = require('mongoose')
const api = require('./server/routes/api')
const path = require('path')

const app = express()

mongoose.connect('mongodb://localhost:27017/personalDB', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', api)

const PORT = 4200
app.listen(PORT, () => {
  console.log(`Up and running on ${PORT}`)
})