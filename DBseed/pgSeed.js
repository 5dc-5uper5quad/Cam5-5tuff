const pg = require('pg')
const db = require('../database/postgresql.js')
const faker = require('faker')

// gameId:Number,
// gameTitle:String,
// gameDescription:String,
// gameDeveloper:String,
// gamePublisher:String,
// releaseDate:Date,
// metaTags:Array,
// videoFileNames:Array,
// photoFileNames:Array
var generate = () => {
  return {
    gameTitle: faker.lorem.word(),
    gameDescription: faker.lorem.paragraph(),
    gameDeveloper: faker.company.companyName(),
    gamePublisher: faker.company.companyName(),
    releaseDate:faker.date.recent(),
    metaTags: faker.lorem.words(),
    photoFileNames: faker.image.imageUrl()
  }
}

var seed = () => {
  db.query(`create table games(
    gameId int,
    gameData json
    );`)
    .then(() => {
      let result = []
      for(let i = 0; i < 10000000; i++){
        result.push([i, generate()])
      }
      let promises = []
      result.forEach((entry) => {
        promises.push(db.query(`insert into games (gameId, gameData) (${entry[0]}, ${entry[1]}})`))
      })
      return promises
    })
    .all(promises)
    .catch(err => console.log(err))



}

db.query('drop database if exists games')
  .then(() => {
    db.query('create database games')
      .then(() => {
        db.query('\\c games')
        .then(seed)
        .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
