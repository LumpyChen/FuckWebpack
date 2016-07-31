const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

let data = require('../../data/chipData.json')

const server = express()
.use(express.static(`${__dirname}/../../`))
.use(bodyParser.json())
.get('/api/chipData', (req, res) => res.json(data))
.post('/api/chipData', (req, res) => res.json(data = req.body))
.get('*', (req, res) => res.sendFile(path.resolve('index.html')))

server.listen(3333, () => {
  console.log('ok, listening on 3333.')
})
