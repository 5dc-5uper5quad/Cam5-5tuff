const pgdb = require('../database/postgresql.js')
const faker = require('faker')
const {seed} = require('./testSeed')
// gameId:Number,
// gameTitle:String,
// gameDescription:String,
// gameDeveloper:String,
// gamePublisher:String,
// releaseDate:Date,
// metaTags:Array,
// videoFileNames:Array,
// photoFileNames:Array


pgdb.query('drop database if exists games')
  .then(() => {
    return pgdb.query('create database games')
  })
  .then(() => {
    return pgdb.query('\\c games')
    })
  .then(() => {
    return pgdb.query(`create table games(
      gameId int,
      gameData json
      );`)
  })
  .then(() => {
    let promises = []
    seed((chunk) => {
      chunk.forEach((data, index) => {
        promises.push(pgdb.query(`insert into games (gameId, gameData) values (${index}, ${data})`))
      })
      Promise.all(promises)
    })
  })
  .catch(err => console.log(err))