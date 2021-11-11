let mysql = require("mysql");
let pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb",
  connectionLimit: 10,
});

pool.getConnection(function(err, connection) {
  if(err) throw err;
  console.log("connection success");
});

module.exports = pool;
