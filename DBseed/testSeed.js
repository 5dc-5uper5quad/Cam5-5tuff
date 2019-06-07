const faker = require('faker')

var generate = () => {
  return `{"gameTitle":"${faker.lorem.word()}","gameDescription":"${faker.lorem.paragraph()}","gameDeveloper":"${faker.company.companyName()}","gamePublisher":"${faker.company.companyName()}","releaseDate":"${faker.date.recent()}","metaTags":"${faker.lorem.words()}","photoFileNames":"${faker.image.imageUrl()}"}`
}

var seed = (callback) => {
  let chunk = []
  for(let i = 0; i < 100000; i++){
  chunk.push(generate())
  }
  callback(chunk)
}

let count = 0
for(let i = 0; i < 100; i++) {
  seed((chunk) => {
    console.log(count++)
  })
}
console.log(count)


module.exports.seed = seed
