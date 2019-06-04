const Games = require('./index.js')
const mongoose = require('mongoose')



module.exports.findOneGame = (idNumber, callback)=>{
  return Games.find({gameId:idNumber}, (err, result) => {
    if(err) {
      callback(err)
      return err
    } else {
      callback(null, result)
      return result
    }
  })
}

module.exports.deleteOneGame = (idNumber, callback) => {
  Games.deleteOne({gameId:idNumber}, (err) =>{
    if(err){
      callback(err)
    } else {
      callback(null)
    }
  })
}

module.exports.updateOneGame = (idNumber, changes,  callback) => {
  Games.findOneAndDelete({gameId:idnumber}, changes,  (err, result) => {
    if(err) {
      callback(err)
    } else {
      callback(null, result)
    }
  })
}

module.exports.addOneGame = (game, callback) => {
  //probably verify integrity of object before invoking save
  Games.save(game, (err, doc) => {
    if(err){
      callback(err)
    } else {
      callback(null, doc)
    }
  })
}