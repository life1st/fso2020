const morgan = require('morgan')

module.exports = {
  morgan: () => {
    return morgan('tiny')
  }
}