const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./router')

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

const app = express()

app.use(cors(corsOptions))

app.use(bodyParser.json())

app.use(router)

module.exports = app