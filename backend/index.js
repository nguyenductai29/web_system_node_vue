import cors from 'cors'
import helmet from 'helmet'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

import errorHandler from './helpers/error.js'
import router from './routes/routes.js'

const dirname = path.dirname(fileURLToPath(import.meta.url))
// const appPath = path.join(dirname, 'views')
const app = express()

app.use(express.json({ limit: '100mb' }))
// app.use(express.static(appPath))
app.use('/public', express.static(dirname + '/public/'));

app.use(cors())
app.use(helmet())

// app.get('/*', (req, res) => res.sendFile(path.join(appPath, 'index.html')))

app.use(router)

//  tắt header [X-Powered-By]
app.disable('x-powered-by')
app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
