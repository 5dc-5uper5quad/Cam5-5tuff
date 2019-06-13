// const cassandra = require('cassandra-driver')


// const contact = '127.0.0.1:9042'

// const cassClient = new cassandra.Client({
//   contactPoints: ['127.0.0.1'],
//   localDataCenter: 'datacenter1',
//   keyspace:'system'
// })

const cassandra = require('cassandra-driver');
const distance = cassandra.types.distance;

const options = {
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  pooling: {
    coreConnectionsPerHost: {
      [distance.local]: 2,
      [distance.remote]: 1
    } 
  }
};

const cassClient = new cassandra.Client(options);

cassClient.connect((err) => {
  if(err){
    console.log(err)
  } else {
    console.log('connected to cassandra')
  }
})

module.exports.cassdb = cassClient