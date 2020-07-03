const express = require('express')
const { phonebook } = require('./model')

const api = express.Router()
.get('/persons', (req, res) => {
  const { persons } = phonebook
  res.json(persons)
})
.post('/persons', (req, res) => {
  const info = req.body
  console.log(req.body)
  if (phonebook.addPerson(info)) {
    res.json(phonebook.persons)
  } else {
    res.status(400).json({
      err: 'wrong person info.'
    })
  }
})
.get('/persons/:id', (req, res) => {
  const id = Number(req.params.id)

  if (!id) {
    return res.status(404).end()
  }

  const { persons } = phonebook
  let p = persons.find(p => p.id === id)
  if (!p) {
    return res.status(404).end()
  }
  
  return res.json(p)
})
.delete('/persons/:id', (req, res) => {
  const id = Number(req.params.id)

  if (!id) {
    return res.status(404).end()
  }

  phonebook.deleteOneById(id)
  return res.status(204).end()
})

module.exports = { api }