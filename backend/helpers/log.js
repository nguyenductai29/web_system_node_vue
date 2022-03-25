import log4js from 'log4js'
import config from '../config/log4js.js'

log4js.configure(config)
const logger = log4js.getLogger('system')

const logMessage = (prefix, log) => `${prefix.padEnd(15, ' ')}${log ? ' - ' + log : ''}`
const writeLog = (level, prefix, log) => logger[level](`${JSON.stringify(logMessage(prefix, log))}`)

const info = (prefix, log) => writeLog('info', prefix, log)
const debug = (prefix, log) => writeLog('debug', prefix, log)
const error = (prefix, log) => writeLog('error', prefix, log)

const transition = (body) => info('Transition', `${body.formName ?? ''} > ${body.toName}`)
const apiCall = (req) => {
    const ipAddress = getIPAddress(req)
    info('Api Call', `${ipAddress} => ${req.url}`)
    if (req.body) info('Api Params', JSON.stringify(req.body))
}

const getIPAddress = function (req) {
    const remoteAddress = req.socket.remoteAdress
    const splittedAddress = remoteAddress.split(':')
    return splittedAddress[splittedAddress.length - 1]
}

const methodStart = (name) => debug('Method Start', name)
const methodEnd = (name) => debug('Method End', name)

export default {
    transition,
    apiCall,
    methodStart,
    methodEnd,
    info,
    debug,
    error
}
