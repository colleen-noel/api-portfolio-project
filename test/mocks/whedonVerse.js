const mockSeries = [{
  name: 'Buffy the Vampire Slayer',
  airDates: '1997 - 2003',
  numberOfSeasons: 7,
}]

const mockMovie = [{
  name: 'Avengers: Age of Ultron',
  yearReleased: 2015,
  director: 'Joss Whedon',
}]

const projectList = [mockSeries, mockMovie]

const singleMovie = {
  name: 'Much Ado About Nothing',
  yearReleased: 2013,
  director: 'Joss Whedon',
}

const addedMovie = {
  director: 'Joss Whedon',
  id: '2',
  name: 'Much Ado About Nothing',
  yearReleased: 2013
}

const incompleteMovie = {
  name: 'Cabin in the Woods',
  yearReleased: 2012,
  director: '',
}

module.exports = { projectList, singleMovie, addedMovie, incompleteMovie }

