const mockSeries = {
  name: 'Dollhouse',
  airDates: '2009-2010',
  numberOfSeasons: 2,
}

const newSeries = {
  name: 'Angel',
  airDates: '1999 - 2004',
  numberOfSeasons: 5,
}

const addedSeries = {
  id: '3',
  name: 'Angel',
  airDates: '1999 - 2004',
  numberOfSeasons: 5,
}

const incompleteSeries = {
  id: '3',
  name: '',
  airDates: '1999 - 2004',
  numberOfSeasons: 5,
}


module.exports = { mockSeries, newSeries, addedSeries, incompleteSeries }
