const { app } = require('./app')

const PORT = process.env.$PORT || process.env.PORT || 3001

app.listen(PORT, () => {
  console.log('server run@http://localhost:3001')
})