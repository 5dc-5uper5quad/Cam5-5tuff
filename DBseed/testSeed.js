const faker = require('faker')
var counter = 0
getVideoFileNames = (n) => {
  let fileNames = []
  for(let i = 0; i <= n; i++){
    if(counter <= 135){
      fileNames.push('' + counter)
      counter++
    } else {
      counter = 0
      fileNames.push('' + counter)
    }
  }
  return fileNames
}
var generate = () => {
  return `{"gameTitle": "${faker.lorem.word()}",
  "gameDescription": "${faker.lorem.paragraph()}",
  "gameDeveloper": "${faker.lorem.words()}",
  "gamePublisher": "${faker.lorem.words()}",
  "releaseDate": "${faker.date.recent()}",
  "metaTags": "${faker.lorem.words()}",
  "PhotoLinks": "${[faker.image.imageUrl(), faker.image.imageUrl(), faker.image.imageUrl()]}",
  "videoFilesNames": "${[getVideoFileNames(3)]}",
  "ThumbnailLinks": "${[faker.image.imageUrl(), faker.image.imageUrl(), faker.image.imageUrl()]}"
}`
}

var seed = (callback) => {
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
