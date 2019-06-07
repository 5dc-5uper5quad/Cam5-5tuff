const cassandra = require('cassandra-driver')
const cassdb = require('../database/cassandra.js')
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
  cassdb.execute(`create table games.games(
    gameId UUID primary key,
    gameData text
    );`, (err) => {
      if(err) {
        console.log(err)
      } else {
        let queries = []
        for(let i = 0; i < 10000000; i++){
          let gameData = JSON.stringify(generate())
          queries.push({query:`insert into games(gameData) values(${gameData})`})
        }
        cassdb.batch(queries, {prepare:true}, (err) => {
          if(err){
            console.log(err)
          } else {
            console.log('Data Seeded')
          }
        })
      }
    })



}

cassdb.execute('drop keyspace if exists games')
  .then(() => {
    cassdb.execute('create keyspace games')
    .then(seed)
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
