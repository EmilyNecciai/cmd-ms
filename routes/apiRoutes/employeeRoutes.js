const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

//GET ALL EMPLOYEES
router.get('/employee', (req, res) => {
    const sql = `
    SELECT 
      employee.first_name AS first, 
      employee.last_name AS last, 
      role.title AS title, 
      role.salary AS salary,
      department.name AS department,
      employee.manager_id AS manager
    FROM employee
    JOIN role
      ON employee.role_id = role.id
    JOIN department
      ON role.department_id = department.id
      `;
    
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

//POST new employee
router.post('/employee', ({ body }, res) => {
  
    const sql = `
    INSERT INTO employee (
      first_name, 
      last_name, 
      role_id, 
      manager_id) 
    VALUES (
      ?,
      ?,
      ?,
      ?)
      `;

    const params = [
      body.first_name,
      body.last_name,
      body.role_id,
      body.manager_id
    ];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: body,
      });
    });
  });
  

// Update an employee's role
router.put('/employee/:id', (req, res) => {

  const sql = `
  UPDATE employee 
  SET role_id = ? 
  WHERE id = ?`;
  
  const params = [
    req.body.role_id, 
    req.params.id
  ];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Employee not found.'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});






module.exports = router;
