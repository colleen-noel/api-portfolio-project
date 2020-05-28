const {
  describe, it, before, after, afterEach, beforeEach
} = require('mocha')
const { createSandbox } = require('sinon')
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const { projectList, singleMovie, addedMovie, incompleteMovie } = require('../mocks/whedonVerse')
const { getAllProjects, getMoviesByName, saveNewMovie } = require('../../controllers/movies')
const { getSeriesByName, saveNewSeries, deleteSeries } = require('../../controllers/series')
const { getMoviesandSeriesByActor } = require('../../controllers/actors')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - movies', () => {
  let sandbox
  let stubbedMoviesFindAll
  let stubbedSeriesFindAll
  let stubbedMoviesCreate
  let stubbedSeriesCreate
  let stubbedActorsFindOne
  let stubbedSeriesFindOne
  let stubbedSeriesDestroy
  let stubbedStatus
  let stubbedSend
  let stubbedSendStatus
  let stubbedStatusSend
  let response
})

before(() => {
  sandbox = createSandbox()

  stubbedMoviesFindAll = sandbox.stub(models.Movies, 'findAll')
  stubbedMoviesCreate = sandbox.stub(models.Movies, 'create')
  stubbedSeriesFindAll = sandbox.stub(models.Series, 'findAll')
  stubbedSeriesCreate = sandbox.stub(models.Series, 'create')
  stubbedActorsFindOne = sandbox.stub(models.Actors, 'findOne')
  stubbedSeriesFindOne = sandbox.stub(models.Series, 'findOne')
  stubbedSeriesDestroy = sandbox.stub(models.Series, 'destroy')
  stubbedSend = sandbox.stub()
  stubbedStatus = sandbox.stub()
  stubbedSendStatus = sandbox.stub()
  stubbedStatusSend = sandbox.stub()
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


// describe('getAllProjects', () => {
//   it('reteieves a list of movies and series from the database and calls response.send() with the list', async () => {
//     stubbedMoviesFindAll.returns(projectList)
//     stubbedSeriesFindAll.returns(projectList)

//     await getAllProjects({}, response)


//     expect(response.send).to.have.been.calledWith(projectList)

//   })
// })

// it('returns a 500 error when database call throws an error', async () => {
//   stubbedMoviesFindAll.throws('ERROR!')

//   await getAllProjects({}, response)


//   expect(stubbedStatus).to.have.been.calledWith(500)
//   expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retreive projects, please try again.')
// })

describe('saveNewMovie', () => {
  it('accepts new movie details and saves them as a new movie in the database, returning the saved record with a 201 status', async () => {
    const request = { body: singleMovie }
    //console.log('here')
    stubbedMoviesCreate.returns(addedMovie)
    //console.log('newMovie', addedMovie)
    // const saveNewMovieResp = await saveNewMovie(request, response)
    // console.log("saveNewMovieResp: ", saveNewMovieResp) // why is this undefined???
    //console.log("stubbedStatusSend", stubbedStatusSend())
    //expect(stubbedMoviesCreate).to.have.been.calledWith(singleMovie)
    //expect(stubbedStatus).to.have.been.calledWith(201)
    // how do we tell what it was actually called with
    //expect(stubbedStatusSend).to.have.been.calledWith(addedMovie)
    //})

    // it('sends a 404 when the movie is not created', async () => {
    //   const request = { body: incompleteMovie }

    //   stubbedMoviesCreate.returns(incompleteMovie)

    //   await saveNewMovie(request, response)

    //   expect(stubbedMoviesCreate).to.not.have.been.calledWith(incompleteMovie)
    expect(stubbedSendStatus).to.have.been.calledWith(404)
    // })
    //)

    // describe('getMoviesByName', () => {
    //   it('retrieves all movies associated with the provided name from the database, and calls response.send with it', async () => {
    //     const request = { params: { name: 'Much Ado About Nothing' } }

    //     stubbedMoviesFindAll.returns(singleMovie)

    //     await getMoviesByName(request, response)

    //     expect(stubbedMoviesFindAll).to.have.been.calledWith({
    //       attributes: ['name', 'dateReleased', 'director'],
    //       where: { name: 'Much Ado About Nothing' }
    //     })
    //     expect(stubbedSend).to.have.been.calledWith(singleMovie)
    //   })

    //   it('returns a 404 when no movie is found', async () => {
    //     const request = { params: { name: 'not-found' } }

    //     stubbedMoviesFindAll.returns(null)
    //     await getMoviesByName(request, response)

    //     expect(stubbedMoviesFindAll).to.have.been.calledWith({
    //       attributes: ['name', 'dateReleased', 'director'],
    //       where: { name: 'not-found' }
    //     })
    //     expect(stubbedSendStatus).to.have.been.calledWith(404)
    //   })
  })



