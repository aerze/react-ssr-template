import bodyParser from 'body-parser'
import compression from 'compression'
import express from 'express'
import morgan from 'morgan'
import path from 'path'

import index from './routes/indexRouter'
import api from './routes/apiRouter'
import universalLoader from './universal'

// Create our express app (using the port optionally specified)
const app = express()
const PORT = process.env.PORT || 3000

// Compress, parse, and log
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))

// Set up route handling, include static assets and an optional API
app.use('/', index)
app.use(express.static(path.resolve(__dirname, '../build')))
app.use('/api', api)
app.use('/', universalLoader)

// Let's rock
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
})

// Handle the bugs somehow
app.on('error', error => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      return process.exit(1)
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      return process.exit(1)
    default:
      throw error
  }
})
