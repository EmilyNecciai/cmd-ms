// NOT DONE

const inquirer = require("inquirer");

function addRole(connection, menu){
  inquirer
  .prompt([
      {
          type: "input",
          name: "name",
          message: "What is the name of the new role?",
          validate: name => {
            if (name) {
            return true;
            } else {
            console.log('You need to input a role name!');
            return false;
            }
        }
      }
    ])
    .then(answer => {

  connection.query(`
  INSERT INTO role (
      title, 
      salary, 
      department_id) 
    VALUES (
      ${JSON.stringify(answer.title)},
      ${JSON.stringify(answer.salary)},
      ${JSON.stringify(answer.department_id)})
    `, 
    function (err, result){
        if (err) throw err;
        console.table(result)
        menu();
      }
      )
    }
    )
  }

module.exports = addRole;