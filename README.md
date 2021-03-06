# Project Name

> Project description

## Related Projects

  - https://github.com/hair-punk/fec3-abhi-service
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage
Install the dependencies with
npm install
install mongodb in the package manager of your choice

then seed the database by running
npm run seed-db

to start the express server run
npm run express-server

to start the front end run

npm run front-end

now the server is operational, and should be accessable from localhost:3001

API

GET /games/?id=
  responds with the game to be used for this item page
POST /games
  Adds a game to the database
PUT /games/?id=
  updates a Games document in the database
DELETE /games/?id=
  delets a Games document in the database

POSTGRES
start postgres: pg_ctl -D /usr/local/var/postgres start
stop postgres:pg_ctl -D /usr/local/var/postgres stop

CASSANDRA 
seems to require JDK version 8
check jdk version:
java -version
(should read ~1.8)
else download correct version and run:
export JAVA_HOME=`/usr/libexec/java_home -v 1.8`

start cassandra: 
cassandra -f
kill cassandra process: kill $(lsof -t -i :[PORT_NUMBER])
## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

npm install


