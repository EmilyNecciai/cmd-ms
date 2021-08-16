// Done.

const inquirer = require("inquirer");

var departmentArr = [];


function departmentList(connection){
  connection.query(`
  SELECT id FROM department
      `, 
      function (err, result){
          if (err) throw err;
          for (let i = 0; i < result.length; i++) {
            departmentArr.push(result[i].id);
          }
          return departmentArr;
      })         
  } 


function addRole(connection, menu){
  departmentList(connection);
  inquirer
  .prompt([
      {
          type: "input",
          name: "title",
          message: "What is the name of the new role?",
          validate: title => {
            if (title) {
            return true;
            } else {
            console.log('You need to input a role name!');
            return false;
            }
        }
      },
      {
          type: "input",
          name: "salary",
          message: "What is the salary of the new role?",
          validate: salary => {
            if (salary) {
            return true;
            } else {
            console.log('You need to input a salary!');
            return false;
            }
        }
      },
    {
      type: "list",
      name: "department_id",
      message: "What is the department of the new role?",
      choices: departmentArr
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