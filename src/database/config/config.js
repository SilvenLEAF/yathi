const config = require('config');
const database = config.get('database');
const DB_STRING = database.connectionString;

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