const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//var db = mongoose.connect("mongodb://localhost/herodb");
var connection = mongoose.createConnection("mongodb://localhost/herodb");

const gameItem = new Schema(
  {
    gameId:Number,
    gameTitle:String,
    gameDescription:String,
    gameDeveloper:String,
    gamePublisher:String,
    releaseDate:Date,
    metaTags:Array
  }
);
var Games = connection.model('Game', gameItem);

module.exports.Games = Games;