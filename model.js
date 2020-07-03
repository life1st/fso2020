class Phonebook {
  constructor() {
    this.persons = [
      { 
        "name": "Arto Hellas", 
        "number": "040-123456",
        "id": 1
      },
      { 
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "id": 2
      },
      { 
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "id": 3
      },
      { 
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 4
      }
    ]
  }

  count() {
    return this.persons.length
  }
  deleteOneById(id) {
    this.persons = this.persons.filter(p => p.id !== id)
  }
  addPerson(info) {
    if (!(info['name'] && info['number'])) {
      return false
    }
    const id = Math.floor(Math.random() * 10000000)
    this.persons.push({
      ...info, id
    })
    return true
  }
}

module.exports = { phonebook: new Phonebook() }
