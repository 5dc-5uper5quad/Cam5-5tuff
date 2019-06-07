const faker = require('faker')

var generate = () => {
  return `{"gameTitle":"${faker.lorem.word()}","gameDescription":"${faker.lorem.paragraph()}","gameDeveloper":"${faker.company.companyName()}","gamePublisher":"${faker.company.companyName()}","releaseDate":"${faker.date.recent()}","metaTags":"${faker.lorem.words()}","photoFileNames":"${faker.image.imageUrl()}"}`
}

var seed = (callback) => {
  var buildChunk = () => {
    let chunk = []
    for(let i = 0; i < 100000; i++){
      chunk.push(generate())
    }
    return chunk
  }
  for(let i = 0; i < 100; i++) {
    callback(buildChunk())
  }
}



module.exports.seed = seed
