const config = require('config');
const database = config.get('database');
const DB_STRING = `postgres://${database.user}:${database.password}@${database.host}/${database.name}`;

module.exports = {
  development: {
    url: DB_STRING,
    dialect: 'postgres',
  },
  test: {
    url: DB_STRING,
    dialect: 'postgres',
  },
  production: {
    url: DB_STRING,
    dialect: 'postgres',
  },
}