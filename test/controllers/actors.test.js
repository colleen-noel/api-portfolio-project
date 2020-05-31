const {
  describe, it, before, after, afterEach, beforeEach
} = require('mocha')
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const { singleActor } = require('../mocks/actors')
const { getMoviesandSeriesByActor } = require('../../controllers/actors')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - actors', () => {
  let sandbox
  let stubbedFindOne
  let stubbedStatus
  let stubbedSend
  let stubbedStatusSend
  let response


  before(() => {
    sandbox = sinon.createSandbox()

    stubbedFindOne = sandbox.stub(models.Actors, 'findOne')
    stubbedSend = sandbox.stub()
    stubbedStatus = sandbox.stub()
    stubbedSendStatus = sandbox.stub()
    stubbedStatusDotSend = sandbox.stub()


    response = {
      send: stubbedSend,
      sendStatus: stubbedSendStatus,
      status: stubbedStatus
    }
  })

  beforeEach(() => {
    stubbedStatus.returns({ send: stubbedStatusDotSend })
  })

  afterEach(() => {
    sandbox.reset()
  })

  after(() => {
    sandbox.restore()
  })

  describe('getMoviesandSeriesByActor', async () => {
    it('finds an actor by first or last name and returns the projects that actor has starred in, and calls a response.send with it', async () => {

      const request = { params: { identifier: 'Acker' } }

      stubbedFindOne.returns(singleActor)
      await getMoviesandSeriesByActor(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        where: {
          [models.Op.or]: [
            { firstName: { [models.Op.like]: `%Acker%` } },
            { lastName: { [models.Op.like]: `%Acker%` } }
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

      expect(stubbedSend).to.have.been.calledWith(singleActor)

    })

    it('returns a 404 when the requested series is not found in the database', async () => {
      stubbedFindOne.returns(null)

      const request = { params: { identifier: 'not-found' } }

      const variable = await getMoviesandSeriesByActor(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        where: {
          [models.Op.or]: [
            { firstName: { [models.Op.like]: `%not-found%` } },
            { lastName: { [models.Op.like]: `%not-found%` } }
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
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Actor not found, please try again.')
    })


    it('returns a 500 error when database call throws an error', async () => {
      stubbedFindOne.throws('ERROR!')

      await getMoviesandSeriesByActor({}, response)


      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve actor, please try again')
    })

  })
})
