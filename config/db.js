var mysql = require('mysql');
require('dotenv').config();

const database = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
}

const connection = mysql.createConnection(database);

connection.connect(function (err) {
  if (err) console.log("Error in connecting database", err)
  else console.log("Databse connected!");
});

module.exports = connection;