const {pool} = require('../database/postgresql.js')
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

// start postgres: pg_ctl -D /usr/local/var/postgres start
// stop postgres:pg_ctl -D /usr/local/var/postgres stop
pool.connect()
  .then(() => {
    return pool.query('drop table if exists games')
  })
  .then(() => {
    return pool.query(`create table games(
      gameId int primary key,
      gameData text
      );`)
  })
  .then(() => {
    console.log('games table dropped and re-initialized, beginning Seed:')
    let nextId = 0
    var startTime = Date.now()
    var recurseSeed = (count) => {
      let promises = []
      if(count <= 100) {
        seed((chunk) => {
          console.log('chunk recieved')
          chunk.forEach((data) => {
            promises.push(pool.query(`insert into games (gameId, gameData) values (${nextId}, '${data}')`))
            nextId++
          })
          console.log(`Inserting Chunk: ${count}`)
          Promise.all(promises)
            .then(() => {
              console.log(`Finished Chunk ${count}`)
              count++
              recurseSeed(count)
            })
        })
      } else {
        let minsElapsed = (((Date.now() - startTime)/1000)/60).toFixed(2)
        console.log(`seeding postgres completed in ${minsElapsed} minutes`)
      }
    }
    recurseSeed(0)
  })
  .catch(err => console.log(err))