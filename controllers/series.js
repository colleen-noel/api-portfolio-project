const models = require('../models')

const getSeriesByName = async (request, response) => {
  try {
    const { name } = request.params

    const series = await models.Series.findAll({
      where: {
        name: { [models.Op.like]: `%${name}%` },
      },
      include: {
        model: models.Actors
      }
    })

    return series.length > 0
      ? response.send(series)
      : response.status(404).send('No series found by that name, please try again')
  } catch (error) {
    return response.status(500).send('Unable to retrieve series, please try again')
  }
}

const saveNewSeries = async (request, response) => {
  try {
    const { name, airDates, numberOfSeasons } = request.body
    const numberofSeasons = +numberOfSeasons

    if (!name || !airDates || !numberOfSeasons) {
      return response.status(404).send('Cannot create series, missing field(s). Please try again.')
    }
    const newSeries = await models.Series.create({ name, airDates, numberOfSeasons })

    return response.status(201).send(newSeries)
  } catch (error) {
    return response.status(500).send('Unable to add series, please try again.')
  }
}

const deleteSeries = async (request, response) => {
  try {
    const { id } = request.params

    const deletedRecords = await models.Series.destroy({ where: { id: id } })

    if (!deletedRecords) {
      return response.status(404).send('Delete unsuccessful, unable to find series, please try again.')
    }
    return response.status(200).send({ deletedRecords: deletedRecords })
  } catch (error) {
    console.log("error", error)
    return response.status(500).send('Unable to delete series, please try again.')
  }
}
module.exports = { getSeriesByName, saveNewSeries, deleteSeries }
