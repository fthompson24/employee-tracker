const mysql = require('mysql2').verbose();
const cTable = require('console.table');

// Connect to database 
const db = new mysql2.Database('./db/employee.db', err => {
    if (err) {
      return console.error(err.message);
    }
  
    console.log('Connected to the employee database.');
  });

  module.exports = db;