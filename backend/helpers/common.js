import Boom from '@hapi/boom'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import log from './log.js'

const dirname = () => path.dirname(fileURLToPath(import.meta.url))

const getDateByday = (day) => {
    const date = new Date(day)
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    return date
}

const getNowDate = () => {
    log.methodStart('getNowDate')
    const dt = new Date()
    const y = dt.getFullYear()
    const m = (`00${(dt.getMonth() + 1)}`).slice(-2)
    const d = (`00${dt.getDate()}`).slice(-2)
    log.methodEnd('getNowDate')
    return `${y}${m}${d}`
}

const getNowDatetime = () => {
    log.methodStart('getNowDatetime')
    const dt = new Date()
    const y = dt.getFullYear()
    const m = (`00${(dt.getMonth() + 1)}`).slice(-2)
    const d = (`00${dt.getDate()}`).slice(-2)
    const h = (`00${dt.getHours()}`).slice(-2)
    const mi = (`00${dt.getMinutes()}`).slice(-2)
    const s = (`00${dt.getSeconds()}`).slice(-2)
    const ms = (`000${dt.getMilliseconds()}`).slice(-3)
    log.methodEnd('getNowDatetime')
    return `${y}${m}${d}${h}${mi}${s}${ms}`
}

export default {
    dirname,
    getDateByday,
    getNowDate,
    getNowDatetime
}
