# api-portfolio-project
You will be building a working API and front-end. This is part 1 of 2.
Create a new repo in GitHub for your project, make your instructor a collaborator, and clone it locally. Remember to work in and part-one-answer branch, not master
In this part of your project you will be building the front-end for your API site. The design and content of your front-end is up to you, the only requirement is that it provides documentation for using the API you will be building
Your first progress check with your instructor will be the week of April 19th
You should push all progress to GitHub prior to your meeting with the instructor
Your graded submission for this part will be due on Thursday April 30th before class


GET http://localhost:4004/whedonverse

* Returns all projects in the database.

    {
  "movies": [
    {
      "id": 1,
      "name": "Avengers: Age of Ultron",
      "yearReleased": 2015,
      "director": "Joss Whedon",
      "createdAt": "2020-05-31T00:34:43.000Z",
      "updatedAt": "2020-05-31T00:34:43.000Z"
    },

    and all other movies

    AND
    "series": [
    {
      "id": 1,
      "name": "Agents of Shield",
      "airDates": "2013 - 2020",
      "numberofSeasons": 7,
      "createdAt": "2020-05-31T00:34:43.000Z",
      "updatedAt": "2020-05-31T00:34:43.000Z",
      "deletedAt": null
    },

    and all other series

GET http://localhost:4004/whedonverse/movies/avengers

  * Returns all movies that partially match specified name, with the actor that starred in them

    {
    "id": 1,
    "name": "Avengers: Age of Ultron",
    "yearReleased": 2015,
    "director": "Joss Whedon",
    "createdAt": "2020-05-31T00:34:43.000Z",
    "updatedAt": "2020-05-31T00:34:43.000Z",
    "actors": [
      {
        "id": 10,
        "firstName": "Robert",
        "lastName": "Downey Jr",
        "createdAt": "2020-05-31T00:34:43.000Z",
        "updatedAt": "2020-05-31T00:34:43.000Z",
        "moviesActors": {
          "actorId": 10,
          "movieId": 1,
          "createdAt": "2020-05-31T00:34:43.000Z",
          "updatedAt": "2020-05-31T00:34:43.000Z"
        }

          and all other actor in this film

           "id": 3,
    "name": "The Avengers",
    "yearReleased": 2012,
    "director": "Joss Whedon",
    "createdAt": "2020-05-31T00:34:43.000Z",
    "updatedAt": "2020-05-31T00:34:43.000Z",
    "actors": [
      {
        "id": 10,
        "firstName": "Robert",
        "lastName": "Downey Jr",
        "createdAt": "2020-05-31T00:34:43.000Z",
        "updatedAt": "2020-05-31T00:34:43.000Z",
        "moviesActors": {
          "actorId": 10,
          "movieId": 3,
          "createdAt": "2020-05-31T00:34:43.000Z",
          "updatedAt": "2020-05-31T00:34:43.000Z"
        }
      },
        
        and all other actors starring in this film

GET http://localhost:4004/whedonverse/series/buffy

  * Returns all series that partially match the requested name, and the actors that starred in it

    {
    "id": 5,
    "name": "Buffy the Vampire Slayer",
    "airDates": "1997 - 2003",
    "numberofSeasons": 7,
    "createdAt": "2020-05-31T00:34:43.000Z",
    "updatedAt": "2020-05-31T00:34:43.000Z",
    "deletedAt": null,
    "actors": [
      {
        "id": 14,
        "firstName": "Sarah Michelle",
        "lastName": "Gellar",
        "createdAt": "2020-05-31T00:34:43.000Z",
        "updatedAt": "2020-05-31T00:34:43.000Z",
        "seriesActors": {
          "actorId": 14,
          "seriesId": 5,
          "createdAt": "2020-05-31T00:34:43.000Z",
          "updatedAt": "2020-05-31T00:34:43.000Z"
        }
      },

      and all other actors starring in this series

GET http://localhost:4004/whedonVerse/actor/acker
  
  * Returns the actor that partially matches the requested name, and all project they have starred in

    "id": 1,
  "firstName": "Amy",
  "lastName": "Acker",
  "createdAt": "2020-05-31T00:34:43.000Z",
  "updatedAt": "2020-05-31T00:34:43.000Z",
  "movies": [
    {
      "id": 2,
      "name": "Much Ado About Nothing",
      "moviesActors": {
        "actorId": 1,
        "movieId": 2,
        "createdAt": "2020-05-31T00:34:43.000Z",
        "updatedAt": "2020-05-31T00:34:43.000Z"
      }
    },
    {
      "id": 4,
      "name": "Cabin in the Woods",
      "moviesActors": {
        "actorId": 1,
        "movieId": 4,
        "createdAt": "2020-05-31T00:34:43.000Z",
        "updatedAt": "2020-05-31T00:34:43.000Z"
      }
    }
  ],
  "series": [
    {
      "id": 2,
      "name": "Dollhouse",
      "seriesActors": {
        "actorId": 1,
        "seriesId": 2,
        "createdAt": "2020-05-31T00:34:43.000Z",
        "updatedAt": "2020-05-31T00:34:43.000Z"
      }
    },

    and all other projects this actor has starred in

POST http://localhost:4004/whedonVerse/movie

  * Adds new movie to the database and returns movie info

      {
    "name": "Buffy the Vampire Slayer",
    "yearReleased": 1992,
    "director": "Fran Rubel Kuzui"
  }

POST http://localhost:4004/whedonVerse/series

  * Adds a new series to the database and returns the movie info

        {
      "name": "Dr Horrible's Sing-Along Blog",
      "airDates": "2008",
      "numberOfSeasons": 1
    }

DELETE http://localhost:4004/whedonVerse/series/3

  * Deletes a series from the database

     {
      "id": 2,
      "name": "Dollhouse",
      "airDates": "2009-2010",
      "numberofSeasons": 2,
      "createdAt": "2020-05-31T00:34:43.000Z",
      "updatedAt": "2020-05-31T00:34:43.000Z",
      "deletedAt": null
    },
    {
      "id": 4,
      "name": "Firefly",
      "airDates": "2002 - 2003",
      "numberofSeasons": 1,
      "createdAt": "2020-05-31T00:34:43.000Z",
      "updatedAt": "2020-05-31T00:34:43.000Z",
      "deletedAt": null
    },








        

