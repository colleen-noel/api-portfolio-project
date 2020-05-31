const {
  describe, it, before, after, afterEach, beforeEach
} = require('mocha')
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const { mockSeries, mockMovie, singleMovie, addedMovie, incompleteMovie } = require('../mocks/movies')
const { getAllProjects, getMoviesByName, saveNewMovie } = require('../../controllers/movies')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - movies', () => {
  let sandbox
  let stubbedMoviesFindAll
  let stubbedSeriesFindAll
  let stubbedMoviesCreate
  let stubbedStatus
  let stubbedSend
  let stubbedStatusSend
  let response


  before(() => {
    sandbox = sinon.createSandbox()

    stubbedMoviesFindAll = sandbox.stub(models.Movies, 'findAll')
    stubbedFindAll = sandbox.stub(models.Series, 'findAll')
    stubbedMoviesCreate = sandbox.stub(models.Movies, 'create')
    stubbedSend = sandbox.stub()
    stubbedStatus = sandbox.stub()
    stubbedSendStatus = sandbox.stub()
    stubbedStatusDotSend = sandbox.stub()
    stubbedSeriesFindAll = sandbox.stub()


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


  describe('getAllProjects', () => {
    it('reteieves a list of movies and series from the database and calls response.send() with the list', async () => {
      const request = {}
      stubbedMoviesFindAll.returns([mockMovie])
      stubbedFindAll.returns([mockSeries])

      const projectList = {
        movies: [mockMovie],
        series: [mockSeries]
      }

      await getAllProjects(request, response)

      expect(stubbedSend).to.have.been.calledWith(projectList)
    })

    it('returns an object if at least one movie is found, but no series', async () => {
      const request = {}
      stubbedMoviesFindAll.returns([mockMovie])
      stubbedFindAll.returns([])

      const projectList = {
        movies: [mockMovie],
        series: []
      }

      await getAllProjects(request, response)

      expect(stubbedSend).to.have.been.calledWith(projectList)

    })

    it('returns an object if at least one series is found, but no movies', async () => {
      const request = {}
      stubbedMoviesFindAll.returns([])
      stubbedFindAll.returns([mockSeries])

      const projectList = {
        movies: [],
        series: [mockSeries]
      }

      await getAllProjects(request, response)

      expect(stubbedSend).to.have.been.calledWith(projectList)

    })

    it('returns a 404 when no projects are found.', async () => {
      const request = {}
      stubbedMoviesFindAll.returns([])
      stubbedFindAll.returns([])

      const projectList = {
        movies: [],
        series: []
      }

      await getAllProjects(request, response)

      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No projects found, please try again.')
    })


    it('returns a 500 error when database call throws an error', async () => {
      stubbedMoviesFindAll.throws('ERROR!')

      await getAllProjects({}, response)


      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve projects, please try again.')
    })
  })

  describe('getMoviesByName', () => {
    it('retrieves all movies associated with the provided name from the database, and calls response.send with it', async () => {
      const request = { params: { name: singleMovie.name } }

      stubbedMoviesFindAll.returns([singleMovie])

      await getMoviesByName(request, response)

      expect(stubbedSend).to.have.been.calledWith([singleMovie])
      expect(stubbedMoviesFindAll).to.have.been.calledWith({
        where: {
          name: { [models.Op.like]: `%${singleMovie.name}%` },
        },
        include: [{
          model: models.Actors
        }]
      })
    })

    it('returns a 404 when no movie is found', async () => {
      const request = { params: { name: 'not-found' } }

      stubbedMoviesFindAll.returns([])
      await getMoviesByName(request, response)

      expect(stubbedMoviesFindAll).to.have.been.calledWith({

        where: {
          name: { [models.Op.like]: `%not-found%` },
        },
        include: [{
          model: models.Actors
        }]
      })
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No movies found by that name, please try again.')
    })


    it('returns a 500 error when database call throws an error', async () => {
      stubbedMoviesFindAll.throws('ERROR!')

      await getMoviesByName({}, response)


      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve movies, please try again.')
    })


  })


  describe('saveNewMovie', () => {
    it('accepts new movie details and saves them as a new movie in the database, returning the saved record with a 201 status', async () => {
      const request = { body: singleMovie }

      stubbedMoviesCreate.returns(addedMovie)

      await saveNewMovie(request, response)

      expect(stubbedMoviesCreate).to.have.been.calledWith(singleMovie)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedStatusDotSend).to.have.been.calledWith(addedMovie)
    })

    it('sends a 404 when the movie is not created', async () => {
      const request = { body: incompleteMovie }

      stubbedMoviesCreate.returns(incompleteMovie)

      await saveNewMovie(request, response)

      expect(stubbedMoviesCreate).to.not.have.been.calledWith(incompleteMovie)
      expect(stubbedStatus).to.have.been.calledWith(404)
    })

    it('returns a 500 error when database call throws an error', async () => {
      stubbedMoviesCreate.throws('ERROR!')

      await saveNewMovie({}, response)


      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to add movie, please try again.')
    })
  })
})

