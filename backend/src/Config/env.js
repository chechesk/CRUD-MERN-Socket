require('dotenv').config()
const env = process.env;

module.exports = {
  DB_HOST: env.HOST,
  DB_USER: env.USER,
  DB_PASSWORD: env.PASSWORD,
  DB_NAME: env.DBNAME,
  port: env.PORT,
  MONGODB_URI: env.MONGODB_URI,
  MAIL_HOST: env.MAIL_HOST,
  MAIL_USER: env.MAIL_USER,
  MAIL_PASSWORD: env.MAIL_PASSWORD
}