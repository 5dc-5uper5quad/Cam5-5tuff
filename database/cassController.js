const {cassdb} = require('./cassandra')

module.exports.findOneGame = (idNumber, callback)=>{
  if(callback) {
    cassdb.execute(`select gameData from games where gameId = ${idNumber}`, (err, result) => {
      if(err){
        callback(err)
      } else {
        callback(null, result)
      }
    })
 } else {
   return cassdb.execute(`select gameData from games where gameId = ${idNumber}`)
 }
}

module.exports.deleteOneGame = (idNumber, callback) => {
    cassdb.execute(`delete from games where gameId = ${idNumber}`)
  .then(() => {
    return cassdb.execute(`update games.id_tracker set deleted + ${idNumber}`)
  })
  .then(() => {
    callback(null)
  })
  .catch((err) => {
    callback(err)
  })
}

module.exports.updateOneGame = (idNumber, changes,  callback) => {
  cassdb.execute(`select gameData from games.games where id = ${idNumber}`)
    .then((gameData) => {
      let oldGame =  JSON.parse(gameData)
      let updatedGame = JSON.stringify(Object.assign(oldGame, changes))
      return cassdb.execute(`update games.games set gameData = ${updatedGame} where gameId = ${idNumber}`)
    })
    .then(() => {
      callback(null)
    })
    .catch((err) => {
      callback(err)
    })
}

module.exports.addOneGame = (game, callback) => {
  //probably verify integrity of object before invoking save
  var gameToInsert = JSON.stringify(game)
  let gameId
  cassdb.execute('select deleted from id_tracker')
    .then((idArr) => {
      if(idArr.length > 0) {
        gameId = idArr.pop()
        cassdb.execute(`insert into games.games (gameId, gameData) values (?, ?)`, [gameId, gameToInsert], (err, result) => {
          if(err) {
            callback(err)
          } else {
            callback(null, result)
          }
        })
      } else {
        cassdb.execute('select nextId from id_tracker', (err, id) => {
          if(err) {
            callback(err)
          } else {
            gameId = id
            let newNext = id + 1
            cassdb.execute(`update games.id_tracker set nextId = ${newNext}`)
              .then(() => {
                return cassdb,exectute('insert into games.games (gameId, gameData) values (?, ?)', [gameId, gameToInsert])
            })
            .then(() => {
              callback(null)
            })
              .catch((err) => {
                callback(err)
              })
          }
        })
      }
    })
    .catch((err) => {
      callback(err)
    })
}