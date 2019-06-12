const faker = require('faker')

var generate = () => {
  return `{"gameTitle": "${faker.lorem.word()}",
  "gameDescription": "${faker.lorem.paragraph()}",
  "gameDeveloper": "${faker.lorem.words()}",
  "gamePublisher": "${faker.lorem.words()}",
  "releaseDate": "${faker.date.recent()}",
  "metaTags": "${faker.lorem.words()}",
  "photoFileNames": "${faker.image.imageUrl()}"}`
}

var seed = async (callback) => {
  var buildChunk = () => {
    let chunk = []
    for(let i = 0; i < 100000; i++){
      chunk.push(generate())
    }
    return chunk
  }
  callback(buildChunk())
}



module.exports.seed = seed
