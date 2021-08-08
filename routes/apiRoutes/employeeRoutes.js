const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

//GET ALL EMPLOYEES
router.get('/employee', (req, res) => {
    const sql = `SELECT * FROM employee`;
    
    db.query(sql, (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({
          message: 'success',
          data: rows
        });
        console.table(rows);
    });
});

//GET Single Employee to change role
router.get('/employee/:id', (req, res) => {
    const sql = `SELECT employee.*, employee.role_id 
                 AS title 
                 FROM role 
                 LEFT JOIN role 
                 ON employee.role_id = employee.id 
                 WHERE employee.id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
      console.table(rows);
    });
});





module.exports = router;
