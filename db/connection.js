const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  // Your MySQL username,
  user: "root",
  // Your MySQL password
  password: "1Limli2tst9!9pd",
  database: "workwork",
});

module.exports = db;
