const express = require('express')
const { getEntireWhedonVerse, getMovieOrSeriesByIdentifier, saveNewMovie } = require('./controllers/movies')
const { saveNewSeries, deleteComponent } = require('./controllers/series')
const { getMoviesandSeriesByActor } = require('./controllers/actors')
const bodyParser = require('body-parser')

const app = express()

app.use(express.static('public'))
app.use(bodyParser.json)


app.get('/whedonVerse', getEntireWhedonVerse)

app.get('/whedonVerse/:identifier', getMovieOrSeriesByIdentifier)

app.get('/whedonVerse/:actor', getMoviesandSeriesByActor)

app.post('/whedonVerse', bodyParser.json(), saveNewMovie)

app.post('/whedonVerse', bodyParser.json(), saveNewSeries)

app.delete('/whedonVerse', deleteComponent)


app.all('*', (request, response) => {
  return response.sendStatus(404)
})

app.listen(4004, () => {
  console.log('Listening on port 4004...')
})



