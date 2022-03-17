var mysql = require("mysql2");

var connectDB = mysql.createConnection({
  host: `${process.env.HOST}`,
  user: `${process.env.USERNAME}`,
  password: `${process.env.PASSWORD}`,
  database: `${process.env.DATABASE}`,
  multipleStatements: true,
});

connectDB.connect(function (err) {
  if (err) throw err;
  console.log("Connected!!");
});

module.exports = connectDB;
