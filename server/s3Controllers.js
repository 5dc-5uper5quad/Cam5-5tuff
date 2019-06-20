const AWS = require('aws-sdk');
const AWS_KEYS = require('./credentials.js')

var s3 = new AWS.S3({apiVersion: '2006-03-01',
accessKeyId:AWS_KEYS.ACCESS,
secretAccessKey:AWS_KEYS.SECRET,
region:"us-east-1"});
var videoParams ={
  Bucket:'5uper-video5',
  Key:''
};

var mapFileNamesToURLs = (fileNamesArr, callback) => {
  let URLs = []

  var mapURLs = (fileNamesArr) => {
    videoParams.Key = fileNamesArr.pop() + '.mkv'
    s3.getSignedUrl('getObject', videoParams, (err, result) => {
      if(err){
        fileNamesArr.push(videoParams.Key)
        callback(err)
      } else {
        URLs.push(result)
        if(fileNamesArr[0]){
          mapURLs(fileNamesArr)
        } else {
          callback(null, URLs)
        }
      }
    })
  }
  mapURLs(fileNamesArr)
}

module.exports.mapFileNamesToURLs = mapFileNamesToURLs