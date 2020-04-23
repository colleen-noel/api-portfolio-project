const express = require('express')
const whedonVerse = require('./whedonVerse')
const bodyParser = require('body-parser')

const app = express()

app.use(express.static('public'))
app.use(express.static('node_modules/bootstrap/dist/css'))
app.use(bodyParser.json)






app.get('/whedonVerse', (request, response) => {
  return response.send(whedonVerse)
})






app.all('*', (request, response) => {
  return response.sendStatus(404)
})

app.listen(4000)



