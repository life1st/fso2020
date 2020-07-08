const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const openValidateOnUpdateConfig = {
  runValidators: true
}
class Phonebook {
  constructor() {
    const personSchema = new mongoose.Schema({
      name: {
        type: String,
        unique: true,
        minlength: 3
      },
      number: {
        type: String || Number,
        minlength: 8
      },
    })
    personSchema.plugin(uniqueValidator)
    personSchema.set('toJSON', {
      transform: (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
      }
    })
    this.People = mongoose.model('person', personSchema)
  }

  async count() {
    let people = await this.People.find({})
    return people.length
  }
  async getPeople() {
    return await this.People.find({})
  }
  async getPerson(id) {
    return await this.People.findById(id)
  }
  async addPerson(info) {
    if (!(info['name'] && info['number'])) {
      return false
    }
    const id = Math.floor(Math.random() * 10000000)
    return await new this.People({ ...info, id }).save()
  }
  async updatePhoneNumberById(id, info) {
    const { number } = info
    return await this.People.findByIdAndUpdate(id, { number }, { new: true, ...openValidateOnUpdateConfig })
  }
  async deleteOneById(id) {
    return await this.People.findByIdAndDelete(id)
  }
}

module.exports = { phonebook: new Phonebook() }
