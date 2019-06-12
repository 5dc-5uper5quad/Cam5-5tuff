const cassandra = require('cassandra-driver')
const {cassdb} = require('../database/cassandra.js')
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




cassdb.execute('drop keyspace if exists games;')
  .then(() => {
    return cassdb.execute(`create keyspace games with replication = {
      'class' : 'SimpleStrategy',
      'replication_factor' : 1
    };`)
  })
  .then(() => {
    return cassdb.execute('use games')
  })
  .then(() => {
    return cassdb.execute(`create table games.games(
      gameId UUID primary key,
      gameData text
      );`)
  })
  .then(() => {
    var recurseSeed = (count) => {
      var buildBatch = (chunk, size) =>{
        let batch = []
        for(let i = 0; i <= size; i++){
          let data = chunk.pop()
          batch.push({query:`insert into games (gameId, gameData) values (uuid(), '${data}')`})
        }
        return batch
      }

      var completeBatch = (batch) =>{
        cassdb.batch(batch, { prepare: true })
          .then(() =>{
            if(batches[0]){
              console.log(batches.length)
              completeBatch(batches.pop())
            } else {
              console.log(`finished batches: ${count}`)
              count ++
              recurseSeed(count)
            }
          })
          .catch((err) => { 
            console.log(err)
          })
      }

      let batches = []
      if(count <= 100) {
        seed((chunk) => {
          console.log('chunk recieved')
          for(let i = 0; i <= 10000; i++){
            batches.push(buildBatch(chunk, 10))
          }
        })
        console.log(`starting batches: ${count}`)
        completeBatch(batches.pop())
      }
    }
    recurseSeed(0)
  })
  .catch(err => console.log(err))
