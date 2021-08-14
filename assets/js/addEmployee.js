const inquirer = require("inquirer");

var roleArr = [];
var managerArr = [];


function roleList(connection){
  connection.query(`
  SELECT id FROM role
      `, 
      function (err, result){
          if (err) throw err;
          for (let i = 0; i < result.length; i++) {
              roleArr.push(result[i].id);
          }
          return roleArr;
      })         
  } 


  function managerIdList(connection){

    connection.query(`
    SELECT id FROM employee
        `, 
        function (err, result){
            if (err) throw err;
            for (let i = 0; i < result.length; i++) {
              managerArr.push(result[i].id);
            }
            return managerArr;
        })         
    } 
  

function addEmployee(connection, menu){
  roleList(connection);
  managerIdList(connection);

  inquirer
  .prompt([
      {
          type: "input",
          name: "first_name",
          message: "What is the first name of the new employee?",
          validate: first_name => {
            if (first_name) {
            return true;
            } else {
            console.log('You need to input the first name of the new employee!');
            return false;
            }
        }
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the last name of the new employee?",
        validate: last_name => {
          if (last_name) {
          return true;
          } else {
          console.log('You need to input the last name of the new employee!');
          return false;
          }
        }
      },
      {
        type: "list",
        name: "title",
        message: "What is the new employee's title?",
        choices: roleArr
        },
        {
        type: "list",
        name: "manager_id",
        message: "What is the id of the new employee's manager?",
        choices: managerArr
        }
    ])
    .then(answer => {
      //Run cQ to get role id from title

      // console.log(answer.title)

      // var roleId

      // connection.query(
      //   `SELECT id FROM role
      //   WHERE title = ${JSON.stringify(answer.title)}
      //   `,
      //   function (err, roleId){
      //     console.log(roleId[0].id)
      //     // TO DO - pull in the role id for use in the next cQ
      //     if (err) throw err;
      //     return roleId;
      //   }
      // )

      connection.query(`
      INSERT INTO employee (
          first_name, 
          last_name, 
          role_id, 
          manager_id) 
        VALUES (
          ${JSON.stringify(answer.first_name)},
          ${JSON.stringify(answer.last_name)},
          ${JSON.stringify(answer.title)},
          ${JSON.stringify(answer.manager_id)})
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
    
module.exports = addEmployee;