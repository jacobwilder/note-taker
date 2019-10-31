var mysql = require("mysql");
var dotenv = require("dotenv");
var connection;

dotenv.config();

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER, // FIXME: Establish a connection to your MySQL Database
    password: process.env.DB_PW, // https://www.npmjs.com/package/mysql#establishing-connections
    database: "note_db"
  });
}

connection.config.typeCast = function(field, next) {
  if (field.type == "TINY" && field.length == 1) {
    return field.string() == "1"; // 1 = true, 0 = false
  }
  return next();
};


module.exports = connection;
