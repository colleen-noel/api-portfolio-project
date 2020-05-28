const moviesActors = (connection, Sequelize, Movies, Actors) => {
  return connection.define('moviesActors', {
    actorId: { type: Sequelize.INTEGER, references: { model: Actors, key: 'id' } },
    movieId: { type: Sequelize.INTEGER, refernces: { model: Movies, key: 'id' } }
  }, {
    defaultScope: {
      attributes: { exclude: ['deletedAt'] }
    }
  }, {
    paranoid: true,
  })
}

module.exports = moviesActors
