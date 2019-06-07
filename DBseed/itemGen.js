
  var companyPrefixes = ['Creative', 'Electronic', 'Game', 'Rocket', 'Brutal', 'Frozen'];

  var companySuffixes = ['soft', 'corp', ' Media Group', ' Entertainment Systems', ' Solutions', ' Games'];

  var gameNameNouns = ['day', 'simulator', 'wars', 'land', 'man', ':the game', 'planet','craft', 'fight', 'tanks', 'racer', 'world', 'tycoon', 'scape'];

  var gameNameAdjectives=['brutal', 'realistic', 'violent', 'tactical', 'interesting', 'nonlinear', 'critical', 'futuristic', 'unoriginal', 'exciting', 'fun', 'nostalgic','addicting'];

  var userMetaTags=['action', 'adventure', 'casual', 'strategy', 'rpg', 'massively multiplayer', 'racing', 'puzzle', 'VR', 'Horror', 'Co-op', 'Retro', 'FPS', 'first person', 'survival', 'arcade', 'sandbox', 'space', 'zombies', 'relaxing', 'rogue-like', 'sports', 'RTS', 'fighting', 'Tower Defense', 'Cyberpunk', 'arena shooter', 'steampunk', 'rhythm', 'pirates', 'ninja', 'battle royale', 'cinematic', 'cats'];
const mongoose = require('mongoose');

var DB_SIZE = 100;
const Schema = mongoose.Schema;
const S3VideoCollectionSize = 135;
const S3PhotoCollectionSize = 100;

const gameItem = new Schema(
  {
    gameId:Number,
    gameTitle:String,
    gameDescription:String,
    gameDeveloper:String,
    gamePublisher:String,
    releaseDate:Date,
    metaTags:Array,
    videoFileNames:Array,
    photoFileNames:Array

  }
);
(async function seed(){
  await openConnection().then(await storeGames)
})()

function openConnection(){
  try{
return mongoose.connect("mongodb://localhost/herodb");
  }catch(err){
    console.log('mongoose could not connect')
  }

}

var Games = mongoose.model('Game', gameItem);

 function createEntry(num){
  var entry = {};
  entry.id = num;
  entry.title = gameNameAdjectives[(Math.floor(Math.random()*gameNameAdjectives.length))]+ gameNameNouns[(Math.floor(Math.random()*gameNameNouns.length))];
  entry.description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
  entry.devName = companyPrefixes[Math.floor(Math.random()*companyPrefixes.length)]+ companySuffixes[Math.floor(Math.random()*companySuffixes.length)];
  entry.pubName = companyPrefixes[Math.floor(Math.random()*companyPrefixes.length)]+ companySuffixes[Math.floor(Math.random()*companySuffixes.length)];
  entry.releaseDate= new Date(1514764800000+Math.floor(Math.random()*41904000000));
  entry.metaTags = [];
  for(let x = 0; x < 5;x++){
    entry.metaTags.push(userMetaTags[Math.floor(Math.random()*userMetaTags.length)])
  }
  entry.videoFileNames=[];
  entry.photoFileNames=[];
  for(let x = 0; x <3;x++){
    entry.videoFileNames.push(Math.ceil(Math.random()*S3VideoCollectionSize));
  }
  for(let x = 0; x <2;x++){
    entry.photoFileNames.push(Math.ceil(Math.random()*S3PhotoCollectionSize));
  }
  return entry;
}

async function addGame(id){
    return new Promise(async function(resolve){
             var newData = await createEntry(id);
        var newGame = new Games({
          gameId:newData.id,
          gameTitle:newData.title,
          gameDescription:newData.description,
          gameDeveloper:newData.devName,
          gamePublisher:newData.pubName,
          releaseDate: newData.releaseDate,
          metaTags:newData.metaTags,
          videoFileNames:newData.videoFileNames,
          photoFileNames:newData.photoFileNames
        });
        await newGame.save()
        resolve();
    });

};

async function storeGames(){

  for(let i = 1; i <= 10000000;i++){
    await addGame(i);
    }
    mongoose.disconnect();
}

