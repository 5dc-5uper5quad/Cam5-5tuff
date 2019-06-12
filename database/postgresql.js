const pg = require('pg')

const connection="postgres://@localhost:5432/postgres"

const pool = new pg.Pool({
  connectionString: connection,
})

module.exports.pool = pool