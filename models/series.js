const series = (connection, Sequelize) => {
  return connection.define('series', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING },
    airDates: { type: Sequelize.STRING },
    numberofSeasons: { type: Sequelize.INTEGER }
  }, {
    paranoid: true,
  })
}

module.exports = series