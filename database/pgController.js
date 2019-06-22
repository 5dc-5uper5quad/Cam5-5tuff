const {pool} = require('./postgresql.js')

module.exports.findOneGame = (idNumber, callback)=>{
  if(callback) {
    pool.query(`select gameData from games where gameId = ${idNumber}`, (err, result) => {
      if(err){
        callback(err)
      } else {
        callback(null, result)
      }
    })
 } else {
   return pool.query(`select gameData from games where gameId = ${idNumber}`)
 }
}

module.exports.deleteOneGame = (idNumber, callback) => {
    pool.query(`delete from games where gameId = ${idNumber}`)
  .then(() => {
    return pool.query(`update id_tracker set deleted || ${idNumber}`)
  })
  .then(() => {
    callback(null)
  })
  .catch((err) => {
    callback(err)
  })
}

module.exports.updateOneGame = (idNumber, changes,  callback) => {
  pool.query(`select gameData from games where id = ${idNumber}`)
    .then((gameData) => {
      let oldGame =  JSON.parse(gameData)
      let updatedGame = JSON.stringify(Object.assign(oldGame, changes))
      return pool.query(`update games set gameData = ${updatedGame} where gameId = ${idNumber}`)
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
  pool.query('select deleted from id_tracker')
    .then((idArr) => {
      if(idArr.length > 0) {
        gameId = idArr.pop()
        pool.query(`insert into games (gameId, gameData) values (?, ?)`, [gameId, gameToInsert])
        .then(() => {
          pool.query(`update id_tracker set deleted = array+remove(deleted, ${gameId})`)
        })
      } else {
        pool.query('select nextId from id_tracker', (err, id) => {
          if(err) {
            callback(err)
          } else {
            gameId = id
            let newNext = id + 1
            pool.query(`update id_tracker set nextId = ${newNext}`)
              .then(() => {
                return pool,exectute('insert into games (gameId, gameData) values (?, ?)', [gameId, gameToInsert])
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