const express = require('express');
const bodyParser = require('body-parser');
const {findOneGame, deleteOneGame, updateOneGame, addOneGame} = require('../database/pgController.js')
const {mapFileNamesToURLs} = require('./s3Controllers.js')
const {fetchThumbnails, parseArrays} = require('./dataMassager.js')
let port = process.env.PORT || 3001;

let app = express();
app.use(express.static(__dirname + '/../dist'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/games', async function(req, res){
  if(!req.query.id){
    res.status(404).send('missing request ID')
  } else {
    findOneGame(req.query.id)
      .then((result) => {
        let game = JSON.parse(result.rows[0].gamedata)
        mapFileNamesToURLs(game.videoFilesNames, (err, result) => {
          if(err) {
            res.status(400).send(err)
          } else {
            game.videoLinks = result
            parseArrays(game)
            fetchThumbnails(game)
            res.status(200).send(game)
          }
        })
      })
  }
})

app.post('/games', (req, res) => {
  //add a new game to the DB
  if(!req.body.game){
    res.status(400).send('missing game')
  } else {
    addOneGame(res.body.game, (err, result) => {
      if(err){
        res.status(400).send(err)
      } else {
        res.status(200).send(result)
      }
    })
  }
})

app.put('/games', (req, res) => {
  if(!req.query.id){
    res.status(400).send('No Game ID provided')
  } else {
    //modify a Game entry based on query ID
    updateOneGame(req.query.id, req.body.game, (err, result) => {
      if(err) {
        res.status(400).send(err)
      } else {
        res.status(200).send(result)
      }
    })
  }
})


app.delete('/games', (req,res) => {
  if(!req.query.id){
    res.status(400).send('No Game ID Provided')
  } else {
    //delete a Game entry based on ID
    deleteOneGame(req.query.id, (err) => {
      if(err){
        res.status(400).send(err)
      } else {
        res.status(200).send()
      }
    })
  }
})

app.listen(port, function(){
  console.log(`listening on port ${port}`);
})

