const pg = require('pg')

const connection="postgres://cam:fungus777@localhost:5432/postgres"

const pool = new pg.Pool({
  connectionString: connection
})

module.exports.pool = pool