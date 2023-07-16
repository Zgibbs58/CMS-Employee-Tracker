const express = require("express");
const mysql = require("mysql2");

// const PORT = process.env.PORT || 3001;
// const app = express();

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);
db.connect((error) => {
  if (error) throw error;
});

module.exports = db;
