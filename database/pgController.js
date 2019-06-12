const {pool} = require('./postgresql.js')

module.exports.findOneGame = (idNumber, callback)=>{
  return pool.query(`select gameData from games where gameId = idNumber`, (err, result) => {

  })
}

module.exports.deleteOneGame = (idNumber, callback) => {

}

module.exports.updateOneGame = (idNumber, changes,  callback) => {

}

module.exports.addOneGame = (game, callback) => {
  //probably verify integrity of object before invoking save

}