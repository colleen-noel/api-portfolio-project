const models = require('../models')

const getAllProjects = async (request, response) => {
  try {
    const allMovies = await models.Movies.findAll()
    const allSeries = await models.Series.findAll()
    const allProjects = {
      movies: allMovies,
      series: allSeries
    }

    return (allProjects)
      ? response.send(allProjects)
      : response.status(404).send('No projects found, please try again.')
  } catch (error) {
    return response.status(500).send('Unable to retrieve projects, please try again.')
  }
}

const getMoviesByName = async (request, response) => {
  try {
    const { name } = request.params

    const movie = await models.Movies.findAll({
      where: {
        name: { [models.Op.like]: `%${name}%` },
      },
      include: [{
        model: models.Actors
      }]
    })

    return movie.length > 0
      ? response.send(movie)
      : response.status(404).send('No movies found by that name, please try again.')
  } catch (error) {
    return response.status(500).send('Unable to retreive movies, please try again.')
  }
}

const saveNewMovie = async (request, response) => {
  try {
    const { name, yearReleased, director } = request.body

    if (!name || !yearReleased || !director) {
      return response.status(404).send('Cannot create movie, missing field(s). Please try again.')
    }
    const newMovie = await models.Movies.create({ name, yearReleased, director })

    return response.status(201).send(newMovie)
  } catch (error) {
    return response.status(500).send('Unable to add movie, please try again.')
  }
}

module.exports = { getAllProjects, getMoviesByName, saveNewMovie }
