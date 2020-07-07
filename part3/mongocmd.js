const mongoose = require('mongoose')

const url = (pwd) => `mongodb+srv://jiaoyang:${pwd}@cluster0-kyrqp.mongodb.net/phonebook?retryWrites=true`

// let pwd = process.env.MONGOPWD

const personSchema = new mongoose.Schema({
  name: String,
  number: String || Number
})

const Person = mongoose.model('person', personSchema)

let [_1, _2, pwd, name, number] = process.argv
mongoose.connect(url(pwd), {useNewUrlParser: true, useUnifiedTopology: true})
if (name && number) {
  new Person({name, number})
  .save()
  .then(res => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then(res => {
    let data = res.map(p => `${p.name} ${p.number}`)
    console.log(`phonebook:\n${data.join('\n')}`)
    mongoose.connection.close()
  })
}
