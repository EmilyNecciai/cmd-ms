const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
 
function updateEmployee(connection, menu){
    connection.query(`
      UPDATE employee 
      SET role_id = ? 
      WHERE id = ?
      `, 
      function (err, result){
          if (err) throw err;
          console.table(result)
          menu();
      })         
  }
  
  module.exports = updateEmployee;