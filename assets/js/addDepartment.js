// Done.

const inquirer = require("inquirer");

function addDepartment(connection, menu) {
  inquirer
  .prompt([
      {
          type: "input",
          name: "name",
          message: "What is the name of the new department?",
          validate: name => {
            if (name) {
            return true;
            } else {
            console.log('You need to input a department name!');
            return false;
            }
        }
      }
    ])
    .then(answer => {
      connection.query(`
      INSERT INTO department (name) 
      VALUES (${JSON.stringify(answer.name)})
        `, 
        function (err, result){
          if (err) throw err;
          console.log(answer.name + " added to department list.")
          menu();
        }
      )
    }
    )
  }


module.exports = addDepartment;