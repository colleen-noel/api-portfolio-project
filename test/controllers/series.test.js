const {
  describe, it, before, after, afterEach, beforeEach
} = require('mocha')
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const { mockSeries, newSeries, addedSeries, incompleteSeries } = require('../mocks/series')
const { getSeriesByName, saveNewSeries, deleteSeries } = require('../../controllers/series')


chai.use(sinonChai)
const { expect } = chai

describe('Controllers - series', () => {
  let sandbox
  let stubbedFindAll
  let stubbedCreate
  let stubbedFindOne
  let stubbedDestroy
  let stubbedStatus
  let stubbedSend
  let stubbedStatusSend
  let response


  before(() => {
    sandbox = sinon.createSandbox()

    stubbedFindAll = sandbox.stub(models.Series, 'findAll')
    stubbedCreate = sandbox.stub(models.Series, 'create')
    stubbedFindOne = sandbox.stub(models.Series, 'findOne')
    stubbedDestroy = sandbox.stub(models.Series, 'destroy')
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

  describe('getSeriesByName', () => {
    it('retrieves the series with the provided name and the list of actors in the series from the database, and calls response.send with it', async () => {
      const request = { params: { name: mockSeries.name } }

      stubbedFindAll.returns([mockSeries])
      await getSeriesByName(request, response)

      expect(stubbedFindAll).to.have.been.calledWith({
        where: {
          name: { [models.Op.like]: `%${mockSeries.name}%` },
        },
        include: { model: models.Actors }
      })

      expect(stubbedSend).to.have.been.calledWith([mockSeries])

    })

    it('returns a 404 when the requested series is not found in the database', async () => {
      stubbedFindAll.returns([])

      const request = { params: { name: 'not in database' } }

      await getSeriesByName(request, response)

      expect(stubbedFindAll).to.have.been.calledWith({
        where: {
          name: { [models.Op.like]: `%not in database%` },
        },
        include: { model: models.Actors }
      })
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No series found by that name, please try again')
    })

    it('returns a 500 error when database call throws an error', async () => {
      stubbedFindAll.throws('ERROR!')

      await getSeriesByName({}, response)


      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve series, please try again')
    })
  })

  describe('saveNewSeries', () => {
    it('accepts new series details and saves them as a new series in the database, returning the saved record with a 201 status', async () => {
      const request = { body: newSeries }

      stubbedCreate.returns(addedSeries)

      await saveNewSeries(request, response)

      expect(stubbedCreate).to.have.been.calledWith(newSeries)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedStatusDotSend).to.have.been.calledWith(addedSeries)
    })

    it('sends a 404 when the movie is not created', async () => {
      const request = { body: incompleteSeries }

      stubbedCreate.returns(incompleteSeries)

      await saveNewSeries(request, response)

      expect(stubbedCreate).to.not.have.been.calledWith(incompleteSeries)
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Cannot create series, missing field(s). Please try again.')
    })

    it('returns a 500 error when database call throws an error', async () => {
      stubbedCreate.throws('ERROR!')

      await saveNewSeries({}, response)


      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to add series, please try again.')
    })
  })

  describe('deleteSeries', () => {
    it('finds the requested series in the database, and deletes it, returning a 200 status and success message', async () => {
      const request = { params: { id: 1 } }

      stubbedDestroy.returns(1)
      await deleteSeries(request, response)


      expect(stubbedDestroy).to.have.been.calledWith({ where: { id: 1 } })
      expect(stubbedStatus).to.have.been.calledWith(200)


    })

    it('returns a 404 when the series was not found in the database', async () => {
      const request = { params: { id: 'not-found' } }

      stubbedDestroy.returns(0)
      await deleteSeries(request, response)

      expect(stubbedDestroy).to.have.been.calledWith({ where: { id: 'not-found' } })
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Delete unsuccessful, unable to find series, please try again.')
    })

    it('returns a 500 error when database call throws an error', async () => {
      stubbedDestroy.throws('ERROR!')

      await deleteSeries({}, response)


      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to delete series, please try again.')
    })
  })
})