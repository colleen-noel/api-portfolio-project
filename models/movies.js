const movies = (connection, Sequelize) => {
  return connection.define('movies', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING, },
    yearReleased: { type: Sequelize.INTEGER },
    director: { type: Sequelize.STRING }
  }, {
    defaultScope: {
      attributes: { exclude: ['deletedAt'] }
    }
  }, {
    paranoid: true,
  })
}

module.exports = movies
