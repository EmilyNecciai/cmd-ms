const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');
const inquirer = require("inquirer");


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', apiRoutes);

function init(){
  console.log(`
===========================================================================

Welcome to the Cmd-MS!

The command line CMS application for all of your employee management needs.

===========================================================================
      `);
  menu();  
} ; 

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
      console.log(choice.menu)
      // switch(choice.menu) {
      //   case "View All Departments":
      //     return getDept;
      // }
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