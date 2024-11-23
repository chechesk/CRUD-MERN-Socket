require('dotenv').config()
const env = process.env;

module.exports = {
  DB_HOST: env.HOST,
  DB_USER: env.USER,
  DB_PASSWORD: env.PASSWORD,
  DB_NAME: env.DBNAME,
  port: env.PORT,
  MONGODB_URI: env.MONGODB_URI
}