const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const { morgan } = require('./middleware/log')
const { errorHandler } = require('./middleware/error')
const { api } = require('./api')
const { phonebook } = require('./model')

app.use(bodyParser.json())
app.use(morgan())
app.use(express.static('./static/build'))
app.use(cors())
app.use('/api', api)

app.get('/info', (req, res) => {
  phonebook.count().then(c => {
    res.send(`Phonebook has info for ${c} people \n\n${new Date()}`)
  })
})

app.use(errorHandler)
module.exports = { app }
