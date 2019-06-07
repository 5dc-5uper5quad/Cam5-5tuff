const cassandra = require('cassandra-driver')

const contact = '127.0.0.1:9042'
const cassClient = new cassandra.Client({
  conactPoints:[contact],
  localDataCenter: 'datacenter1'
})

cassClient.connect((err) => {
  if(err){
    console.log(err)
  } else {
    console.log('connected to cassandra')
  }
})

module.exports.cassdb = cassClient