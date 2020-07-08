/*eslint-env node*/

const mongoose = require('mongoose')
let url = (pwd) => `mongodb+srv://jiaoyang:${pwd}@cluster0-kyrqp.mongodb.net/phonebook?retryWrites=true`
let url_local = 'mongodb://localhost:27017/phonebook'

let pwd = process.env.MONGOPWD

if (process.argv.length >= 3) {
  pwd = process.argv[2]
}
if (!pwd) {
  url = () => url_local
}
const connect = () => {
  mongoose.set('useFindAndModify', false)
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useCreateIndex', true);
  return mongoose.connect(url(pwd), { useNewUrlParser: true, useUnifiedTopology: true })
}
const disconnect = () => {
  return mongoose.connection.close()
}

module.exports = {
  connect, disconnect
}
