const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');
const inquirer = require("inquirer");

// REQUIRE FUNCTIONS
const getEmployees = require('./assets/js/getEmployees');
const updateEmployee = require('./assets/js/updateEmployee');
const addEmployee = require('./assets/js/addEmployee');
const getDepartments = require('./assets/js/getDepartments');
const addDepartment = require('./assets/js/addDepartment');
const getRoles = require('./assets/js/getRoles');
const addRole = require('./assets/js/addRole');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', apiRoutes);

// Welcome
function init(){
  console.log(`
===========================================================================

Welcome to the Cmd-MS!

The command line CMS application for all of your employee management needs.

===========================================================================
      `);
  menu();  
} ; 

// Menu
function menu(){
  inquirer
  .prompt([
      {
          type: "list",
          name: "menu",
          message: "What would you like to do?",
          choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Update an Employee Role"
          ]
      }
    ])
    .then((choice) => {
      // console.log(choice.menu)
      if(choice.menu === "View All Departments" ) {
        getDepartments(db, menu);

      } else if(choice.menu === "View All Roles" ) {
        getRoles(db, menu);

      } else if(choice.menu === "View All Employees" ) {
        getEmployees(db, menu);

      } else if(choice.menu === "Add a Department" ) {
        addDepartment(db, menu);

      } else if(choice.menu === "Add a Role" ) {
        addRole(db, menu);

      } else if(choice.menu === "Add an Employee" ) {
        addEmployee(db, menu);

      } else if(choice.menu === "Update an Employee Role" ) {
        updateEmployee(db, menu);
      }
    })
  };

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  // console.log('Connected to the employees database.');
  app.listen(PORT, () => {
    // console.log(`Server running on port ${PORT}`);
  });
});

init();