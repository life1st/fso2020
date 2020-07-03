const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const { morgan } = require('./middleware/log')
const { api } = require('./api')
const { phonebook } = require('./model')

app.use(morgan())
app.use(express.static('./static/build'))
app.use(cors())
app.use(bodyParser.json())
app.use('/api', api)

app.get('/info', (req, res) => {
  res.send(`Phonebook has info for ${phonebook.count()} people \n\n${new Date()}`)
})

module.exports = { app }
