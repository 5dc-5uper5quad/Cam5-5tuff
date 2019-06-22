const faker = require('faker')


const parseArrays = (game) => {
  game.videoFilesNames = game.videoFilesNames.split(',')
  game.PhotoLinks = game.PhotoLinks.split(',')
  game.metaTags = game.metaTags.split(',')
}
const fetchThumbnails = (game) => {
  game.ThumbnailLinks = []
  game.videoFilesNames.forEach(() => {
    game.ThumbnailLinks.push(faker.image.imageUrl())
  })
  game.PhotoLinks.forEach(() => {
    game.ThumbnailLinks.push(faker.image.imageUrl())
  })
}

module.exports.fetchThumbnails = fetchThumbnails
module.exports.parseArrays = parseArrays