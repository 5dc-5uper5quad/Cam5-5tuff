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

    //try without prepare
    //watch activity monitor
    //watch recurseseed calls
    //retry promize method
    //play with row size
    //maybe csv


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
      gameId int primary key,
      gameData text
      );`)
  })
  .then(() => {
  let nextId = 0
  var startTime = Date.now()
  var recurseSeed = (count) => {
    if(count <= 100) {
      seed((chunk) => {
        var query = (data) => {
          cassdb.execute(`insert into games (gameId, gameData) values (?, ?)`, [nextId, data],{prepare: true})
            .then(() => {
              if(chunk[0]){
                nextId++
                query(chunk.pop())
              } else {
                console.log(`finished chunk: ${count}`)
                count++
                recurseSeed(count)
              }
            })
        }
        console.log(`starting Chunk: ${count}`)
        query(chunk.pop())
      })
    } else {
      let minsElapsed = (((Date.now() - startTime)/1000)/60).toFixed(2)
      console.log(`Finished seeding Cassandra in ${minsElapsed} minutes`)
    }
  }
  
  })
  .catch(err => console.log(err))


    //=====UNSTABLE=======
    // var buildBatch = (chunk, size) =>{
    //   let batch = []
    //   for(let i = 0; i <= size; i++){
    //     let data = chunk.pop()
    //     batch.push({query:`insert into games (gameId, gameData) values (${nextId}, '${data}')`})
    //     nextId++
    //   }
    //   return batch
    // }
    // var completeBatch = (batch) =>{
    //   cassdb.batch(batch, { prepare: false })
    //     .then(() =>{
    //       if(batches[0]){
    //         setTimeout(() => {
    //           completeBatch(batches.pop())
    //         }, .1)
    //       } else {
    //         console.log(`finished batches: ${count}`)
    //         count ++
    //         recurseSeed(count)
    //       }
    //     })
    //     .catch((err) => { 
    //       console.log(err)
    //     })
    // }
//...
    // let batches = []
    // for(let i = 0; i <= 50000; i++){
      //   batches.push(buildBatch(chunk, 2))
    // }
//...
    // completeBatch(batches.pop())


  //======PROMISES WONT WORK=======
  // var startTime = Date.now()
  // var recurseSeed = (count) => {
  //   let promises = []
  //   if(count <= 100) {
  //     seed((chunk) => {
  //       console.log('chunk recieved')
  //       chunk.forEach((data, index) => {
  //         promises.push(cassdb.execute(`insert into games (gameId, gameData) values (${index}, '${data}')`, {prepare: false}))
  //       })
  //       console.log(`Inserting Chunk: ${count}`)
  //       Promise.all(promises)
  //         .then(() => {
  //           console.log(`Finished Chunk ${count}`)
  //           count++
  //           recurseSeed(count)
  //         })
  //     })
  //   } else {
  //     let minsElapsed = (((Date.now() - startTime)/1000)/60).toFixed(2)
  //     console.log(`Seeding Cassandra completed in ${minsElapsed} minutes`)
  //   }
  // }
  // recurseSeed(0)

