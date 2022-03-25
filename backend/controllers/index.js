import log from '../helpers/log.js'

export const callApi = (req, res, next) => {
  log.apiCall(req)
  next()
}

export const transition = (req, res) => {
  log.transition(req.body)
  res.json()
}
