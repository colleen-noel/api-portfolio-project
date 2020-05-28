const models = require('../models')

const getMoviesandSeriesByActor = async (request, response) => {
  try {
    const { identifier } = request.params

    const projectsByActor = await models.Actors.findOne({
      where: {
        [models.Op.or]: [
          { firstName: { [models.Op.like]: `%${identifier}%` } },
          { lastName: { [models.Op.like]: `%${identifier}%` } }
        ]
      },

      include: [{
        model: models.Movies,
        attributes: ['id', 'name']
      },
      {
        model: models.Series,
        attributes: ['id', 'name']
      },
      ]

    })

    return projectsByActor
      ? response.send(projectsByActor)
      : response.status(404).send('Actor not found, please try again')
  } catch (error) {
    response.status(500).send('Unable to retreive actor, please try again')
  }
}

module.exports = { getMoviesandSeriesByActor }