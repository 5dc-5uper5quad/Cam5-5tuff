const {pool} = require('../database/postgresql.js')
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
pool.connect()
  .then(() => {
    return pool.query('drop table if exists games')
  })
  .then(() => {
    console.log('1')
    console.log(pool)
    return pool.query(`create table games(
      gameId int,
      gameData text
      );`)
  })
  .then(() => {
    var recurseSeed = (count) => {
      let promises = []
      if(count <= 100) {
        seed((chunk) => {
          console.log('chunk recieved')
          chunk.forEach((data, index) => {
            promises.push(pool.query(`insert into games (gameId, gameData) values (${index}, '${data}')`))
          })
          console.log(`Inserting Chunk: ${count}`)
          Promise.all(promises)
            .then(() => {
              console.log(`Finished Chunk ${count}`)
              count++
              recurseSeed(count)
            })
        })
      }
    }
    recurseSeed(0)
  })
  .then(() => {
    console.log('seeding postgres completed')
  })
  .catch(err => console.log(err))