import log from '../helpers/log.js'

const errorHandler = (err, req, res, next) => {
  const statusCode = err.isBoom ? err.output.statusCode : err.statusCode ?? '500'
  const errorObject = err.isBoom ? err.output.payload : err.statusCode ? err : ({ message: err.message })
  if (err.data) errorObject.data = err.data
  const error = JSON.stringify(errorObject)
  log.error('ErrorHandler', error)

  return res.status(statusCode).json(error)
}

export default errorHandler
