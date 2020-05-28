const seriesActors = (connection, Sequelize, Actors, Series) => {
  return connection.define('seriesActors', {
    actorId: { type: Sequelize.INTEGER, references: { model: Actors, key: 'id' } },
    seriesId: { type: Sequelize.INTEGER, references: { model: Series, key: 'id' } }
  }, {
    defaultScope: {
      attributes: { exclude: ['deletedAt'] }
    }
  }, {
    paranoid: true,
  })
}

module.exports = seriesActors
