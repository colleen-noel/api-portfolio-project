module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    await queryInterface.bulkInsert('movies', [
      { id: '1', name: 'Avengers: Age of Ultron', yearReleased: '2015', director: 'Joss Whedon' },
      { id: '2', name: 'Much Ado About Nothing', yearReleased: '2013', director: 'Joss Whedon' },
      { id: '3', name: 'The Avengers', yearReleased: '2012', director: 'Joss Whedon' },
      { id: '4', name: 'Cabin in the Woods', yearReleased: '2012', director: 'Drew Goddard' },
      { id: '5', name: 'Serenity', yearReleased: '2005', director: 'Joss Whedon' }
    ])

    await queryInterface.bulkInsert('series', [
      { id: '1', name: 'Agents of Shield', airDates: '2013 - 2020', numberOfSeasons: '7' },
      { id: '2', name: 'Dollhouse', airDates: '2009-2010', numberOfSeasons: '2' },
      { id: '3', name: 'Angel', airDates: '1999 - 2004', numberOfSeasons: '5' },
      { id: '4', name: 'Firefly', airDates: '2002 - 2003', numberOfSeasons: '1' },
      { id: '5', name: 'Buffy the Vampire Slayer', airDates: '1997 - 2003', numberOfSeasons: '7' }
    ])

    await queryInterface.bulkInsert('actors', [
      { id: '1', firstName: 'Amy', lastName: 'Acker' },
      { id: '2', firstName: 'Morena', lastName: 'Baccarin' },
      { id: '3', firstName: 'Chloe', lastName: 'Bennet' },
      { id: '4', firstName: 'David', lastName: 'Boreanaz' },
      { id: '5', firstName: 'Nicholas', lastName: 'Brendon' },
      { id: '6', firstName: 'Charisma', lastName: 'Carpenter' },
      { id: '7', firstName: 'Kristen', lastName: 'Connolly' },
      { id: '8', firstName: 'Iain', lastName: 'De Caestecker' },
      { id: '9', firstName: 'Alexis', lastName: 'Denisof' },
      { id: '10', firstName: 'Robert', lastName: 'Downey Jr' },
      { id: '11', firstName: 'Eliza', lastName: 'Dushku' },
      { id: '12', firstName: 'Chris', lastName: 'Evans' },
      { id: '13', firstName: 'Nathan', lastName: 'Fillion' },
      { id: '14', firstName: 'Sarah Michelle', lastName: 'Gellar' },
      { id: '15', firstName: 'Summer', lastName: 'Glau' },
      { id: '16', firstName: 'Clark', lastName: 'Gregg' },
      { id: '17', firstName: 'Andy', lastName: 'Hallet' },
      { id: '18', firstName: 'Alyson', lastName: 'Hannigan' },
      { id: '19', firstName: 'Anthony', lastName: 'Head' },
      { id: '20', firstName: 'Chris', lastName: 'Hemsworth' },
      { id: '21', firstName: 'Elizabeth', lastName: 'Henstridge' },
      { id: '22', firstName: 'Anna', lastName: 'Hutchison' },
      { id: '23', firstName: 'Scarlett', lastName: 'Johansson' },
      { id: '24', firstName: 'Fran', lastName: 'Kranz' },
      { id: '25', firstName: 'Dichen', lastName: 'Lachman' },
      { id: '26', firstName: 'Harry', lastName: 'Lennix' },
      { id: '27', firstName: 'Sean', lastName: 'Maher' },
      { id: '28', firstName: 'James', lastName: 'Marsters' },
      { id: '29', firstName: 'Tahmoh', lastName: 'Penikett' },
      { id: '30', firstName: 'Jeremy', lastName: 'Renner' },
      { id: '31', firstName: 'J. August', lastName: 'Richards' },
      { id: '32', firstName: 'Mark', lastName: 'Ruffalo' },
      { id: '33', firstName: 'Henry', lastName: 'Simmons' },
      { id: '34', firstName: 'Gina', lastName: 'Torres' },
      { id: '35', firstName: 'Alan', lastName: 'Tudyk' },
      { id: '36', firstName: 'Ming-Na', lastName: 'Wen' },
      { id: '37', firstName: 'Jesse', lastName: 'Williams' }
    ])

    await queryInterface.bulkInsert('moviesActors', [
      { actorId: '10', movieId: '1' },
      { actorId: '20', movieId: '1' },
      { actorId: '32', movieId: '1' },
      { actorId: '12', movieId: '1' },
      { actorId: '23', movieId: '1' },
      { actorId: '30', movieId: '1' },
      { actorId: '1', movieId: '2' },
      { actorId: '9', movieId: '2' },
      { actorId: '13', movieId: '2' },
      { actorId: '16', movieId: '2' },
      { actorId: '24', movieId: '2' },
      { actorId: '27', movieId: '2' },
      { actorId: '10', movieId: '3' },
      { actorId: '12', movieId: '3' },
      { actorId: '32', movieId: '3' },
      { actorId: '20', movieId: '3' },
      { actorId: '23', movieId: '3' },
      { actorId: '16', movieId: '3' },
      { actorId: '7', movieId: '4' },
      { actorId: '20', movieId: '4' },
      { actorId: '22', movieId: '4' },
      { actorId: '24', movieId: '4' },
      { actorId: '37', movieId: '4' },
      { actorId: '1', movieId: '4' },
      { actorId: '13', movieId: '5' },
      { actorId: '34', movieId: '5' },
      { actorId: '35', movieId: '5' },
      { actorId: '2', movieId: '5' },
      { actorId: '15', movieId: '5' },
      { actorId: '27', movieId: '5' },
    ])

    return queryInterface.bulkInsert('seriesActors', [
      { actorId: '16', seriesId: '1' },
      { actorId: '36', seriesId: '1' },
      { actorId: '3', seriesId: '1' },
      { actorId: '8', seriesId: '1' },
      { actorId: '21', seriesId: '1' },
      { actorId: '33', seriesId: '1' },
      { actorId: '11', seriesId: '2' },
      { actorId: '26', seriesId: '2' },
      { actorId: '24', seriesId: '2' },
      { actorId: '29', seriesId: '2' },
      { actorId: '25', seriesId: '2' },
      { actorId: '1', seriesId: '2' },
      { actorId: '4', seriesId: '3' },
      { actorId: '9', seriesId: '3' },
      { actorId: '31', seriesId: '3' },
      { actorId: '6', seriesId: '3' },
      { actorId: '17', seriesId: '3' },
      { actorId: '1', seriesId: '3' },
      { actorId: '13', seriesId: '4' },
      { actorId: '34', seriesId: '4' },
      { actorId: '35', seriesId: '4' },
      { actorId: '2', seriesId: '4' },
      { actorId: '15', seriesId: '4' },
      { actorId: '27', seriesId: '4' },
      { actorId: '14', seriesId: '5' },
      { actorId: '5', seriesId: '5' },
      { actorId: '18', seriesId: '5' },
      { actorId: '19', seriesId: '5' },
      { actorId: '28', seriesId: '5' },
      { actorId: '11', seriesId: '5' },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.bulkDelete('seriesActors')

    await queryInterface.bulkDelete('moviesActors')

    await queryInterface.bulkDelete('actors')

    await queryInterface.bulkDelete('series')

    return queryInterface.bulkDelete('movies')
  }
};
