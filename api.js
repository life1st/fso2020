const express = require('express')
const { phonebook } = require('./model')

const api = express.Router()
  .get('/persons', (req, resp) => {
    phonebook.getPeople()
      .then(p => resp.json(p))
  })
  .post('/persons', (req, resp, next) => {
    phonebook.addPerson(req.body)
      .then(p => resp.json(p))
      .catch(next)
  })
  .get('/persons/:id', (req, resp, next) => {
    const { id } = req.params

    phonebook.getPerson(id)
      .then(p => {
        if (!p) {
          return resp.status(404).end()
        }
        return resp.json(p)
      })
      .catch(next)
  })
  .delete('/persons/:id', (req, resp, next) => {
    const { id } = req.params

    phonebook.deleteOneById(id)
      .then(res => {
        if (!res) {
          return resp.status(404).end()
        }
        return resp.status(204).end()
      }).catch(next)
  })
  .put('/persons/:id', (req, resp, next) => {
    const { id } = req.params
    const info = req.body
    phonebook.updatePhoneNumberById(id, info)
      .then(p => {
        if (!p) {
          return resp.status(404).end()
        }
        return resp.json(p)
      })
      .catch(next)
  })

module.exports = { api }