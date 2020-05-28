const express = require('express')
const { getAllProjects, getMoviesByName, saveNewMovie } = require('./controllers/movies')
const { getSeriesByName, saveNewSeries, deleteSeries } = require('./controllers/series')
const { getMoviesandSeriesByActor } = require('./controllers/actors')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'pug')

app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/test', (request, response) => {
  return response.render('index')
})

app.get('/whedonVerse/', getAllProjects)

app.get('/whedonVerse/movies/:name', getMoviesByName)

app.get('/whedonVerse/series/:name', getSeriesByName)

app.get('/whedonVerse/actor/:identifier', getMoviesandSeriesByActor)

app.post('/whedonVerse/movie', bodyParser.json(), saveNewMovie)

app.post('/whedonVerse/series', bodyParser.json(), saveNewSeries)

app.delete('/whedonVerse/series/:id', deleteSeries)


app.all('*', (request, response) => {
  return response.sendStatus(404)
})

app.listen(4004, () => {
  console.log('Listening on port 4004...')
})



