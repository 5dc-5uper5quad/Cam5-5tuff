const express = require('express');
const bodyParser = require('body-parser');
const {findOneGame, updateOneGame, deleteOneGame, addOneGame} = require('../database/gameController.js')
const AWS = require('aws-sdk');
let port = 3008;
const keys = require('../.aws/credentials.js')
let app = express();
var s3 = new AWS.S3({apiVersion: '2006-03-01',
accessKeyId:keys.AWS_ACCESS_KEY,
secretAccessKey:keys.AWS_SECRET_KEY,
region:"us-west-1"});
var videoparams ={
  Bucket:keys.VIDEO_BUCKET,
  Key:''
};
var photoparams = {
  Bucket:keys.PHOTO_BUCKET,
  Key:''
}
var thumbnailparams = {
  Bucket:keys.THUMBNAIL_BUCKET,
  Key:''
}
app.use(express.static(__dirname + '/../dist'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


app.get('/games', async function(req,res){
  var game =  ((await findOneGame(req.query.id))[0])
  game = JSON.parse(JSON.stringify(game));
  game.VideoLinks=[];
  game.PhotoLinks=[];
  game.ThumbnailLinks=[];
   var getVideoUrls = async function(obj){
    videoparams.Key = obj['videoFileNames'][0].toString()+'.mkv';
    s3.getSignedUrl('getObject', videoparams, async(err,url)=>{
      if(err) console.log(err)
      else{
        obj.VideoLinks.push(url);

        videoparams.Key = obj['videoFileNames'][1].toString()+'.mkv';
        s3.getSignedUrl('getObject', videoparams, async(err,url)=>{
          if(err) console.log(err)
          else{
            obj.VideoLinks.push(url);

            videoparams.Key = obj['videoFileNames'][2].toString()+'.mkv';
            s3.getSignedUrl('getObject', videoparams, async(err,url)=>{
              if(err) console.log(err)
              else{
                obj.VideoLinks.push(url);
                photoparams.Key = obj['photoFileNames'][0].toString()+'.jpg';
                s3.getSignedUrl('getObject', photoparams,(err,url)=>{
                  if(err){
                    console.log('couldnt get photo', err)
                  }else{
                    object.PhotoLinks.push(url);
                    photoparams.Key = obj['photoFileNames'][1].toString()+'.jpg';
                    s3.getSignedUrl('getObject', photoparams,(err,url)=>{
                      if(err){
                        console.log('couldnt get photo', err)
                      }else{
                        object.PhotoLinks.push(url);
                        thumbnailparams.Key = obj['videoFileNames'][0].toString()+'.jpg';
                        s3.getSignedUrl('getObject', thumbnailparams, (err, url)=>{
                          if(err){
                            console.log('coundnt get thumbnail',err)
                          }else{
                            obj.ThumbnailLinks.push(url);
                            thumbnailparams.Key = obj['videoFileNames'][1].toString()+'.jpg';
                            s3.getSignedUrl('getObject', thumbnailparams, (err, url)=>{
                              if(err){
                                console.log('coundnt get thumbnail',err)
                              }else{
                                obj.ThumbnailLinks.push(url);
                                thumbnailparams.Key = obj['videoFileNames'][2].toString()+'.jpg';
                                s3.getSignedUrl('getObject', thumbnailparams, (err, url)=>{
                                if(err){
                                  console.log('coundnt get thumbnail',err)
                                }else{
                                  obj.ThumbnailLinks.push(url);
                                  res.send(obj)
                                }
                              })
                              }
                               })
                          }
                        })
                      }
                    })
                  }
                })

              }
            })
          }
        })
      }
    })
  }
  getVideoUrls(game);
   //res.send(object);
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