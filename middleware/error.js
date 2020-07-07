const errorHandler = (error, req, resp, next) => {
  console.error(error.name, error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return resp.status(400).send('malformatted id')
  }
  if (error.name === 'ValidationError') {
    return resp.status(400).send(error.message)
  }

  next(error)
}

module.exports = { errorHandler }
