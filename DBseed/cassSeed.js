const cassandra = require('cassandra-driver')
const cassdb = require('../database/cassandra.js')
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




cassdb.execute('drop keyspace if exists games')
  .then(() => {
    return cassdb.execute('create keyspace games')
  })
  .then(() => {
    return cassdb.execute(`create table games.games(
      gameId int primary key,
      gameData text
      );`)
  })
  .then(() => {
      let queries = []
      seed((chunk) => {
        chunk.forEach((query, index) => {
          queries.push({query:`insert into games(gameId, gameData) values(${index}, ${query})`})
        })
      cassdb.batch(queries, {prepare:true})
    })
  })
  .catch(err => console.log(err))
