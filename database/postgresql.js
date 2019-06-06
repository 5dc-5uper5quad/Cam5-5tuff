const pg = require('pg')

const connection="postgres://root:@localhost:5432/postgres"

const pgClient = new pg.Client(connection)

pgClient.connect()
  .then(() => {
    console.log('connected')
  })
  .catch((err) => {
    console.log('postgres connection error', err)
  })

module.exports.db = pgClient