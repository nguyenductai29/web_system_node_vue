import config from '../config/database.js'
import log from './log.js'

import mysql from 'mysql2'
import Boom from '@hapi/boom'

const connect = () => mysql.createConnection(config)

const beginTransaction = (connection) => {
    log.info('beginTransaction')
    return new Promise((resolve, reject) => {
        connection.beginTransaction((err) => err ? reject(err) : resolve())
    })
}

const select = (connection, statement, params = []) => {
    return query(connection, statement, params).catch(() => {
        throw Boom.internal()
    })
}

const query = (connection, statement, params = []) => {
    log.info('Query', statement.replace(/\s\s+/g, ' ').trim())
    log.info('Query Params', `[${params.join(', ')}]`)
    return new Promise((resolve, reject) => {
        connection.query(statement, params, (err, results, fields) => {
        if (err) {
            log.error('Query State', 'Failed')
            log.error('Error Detail', JSON.stringify(err))
            reject(err)
        } else {
            log.info('Query State', 'Succeeded')
            resolve(results, fields)
        }
        })
    })
}

const commit = (connection) => {
    log.info('Commit')
    return new Promise((resolve, reject) => {
        connection.commit((err) => err ? reject(err) : resolve())
    })
}

const rollback = (connection, err) => {
    log.info('Rollback')
    return new Promise((resolve, reject) => {
        connection.rollback(() => reject(err))
    })
}

export default {
    connect,
    beginTransaction,
    select,
    query,
    commit,
    rollback
  }
