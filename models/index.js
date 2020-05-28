const Sequelize = require('sequelize')
const allConfigs = require('../config/sequelize')
const MoviesModel = require('./movies')
const SeriesModel = require('./series')
const ActorsModel = require('./actors')
const MoviesActorsModel = require('./moviesActors')
const SeriesActorsModel = require('./seriesActors')

const environment = process.env.NODE_ENV || 'development'
const config = allConfigs[environment]

const connection = new Sequelize(config.database, config.username, config.password, {
  host: config.host, dialect: config.dialect
})

const Movies = MoviesModel(connection, Sequelize)
const Series = SeriesModel(connection, Sequelize)
const Actors = ActorsModel(connection, Sequelize)
const MoviesActors = MoviesActorsModel(connection, Sequelize, Movies, Actors)
const SeriesActors = SeriesActorsModel(connection, Sequelize, Series, Actors)

Actors.belongsToMany(Movies, { through: MoviesActors })
Movies.belongsToMany(Actors, { through: MoviesActors })

Actors.belongsToMany(Series, { through: SeriesActors })
Series.belongsToMany(Actors, { through: SeriesActors })

module.exports = {
  Movies,
  Series,
  Actors,
  MoviesActors,
  SeriesActors,
  Op: Sequelize.Op,
}



