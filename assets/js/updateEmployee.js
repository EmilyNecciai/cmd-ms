// Not Done.
 
const inquirer = require("inquirer");

var roleArr = [];
var empArr = [];

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


  function empIdList(connection){

    connection.query(`
    SELECT id FROM employee
        `, 
        function (err, result){
            if (err) throw err;
            for (let i = 0; i < result.length; i++) {
                empArr.push(result[i].id);
            }
            // console.log(empArr)
            return empArr;
        })         
    } 
  

function updateEmployee(connection, menu){
    empIdList(connection);
    roleList(connection);
//   console.log(empArr)


  inquirer
  .prompt([
      {
        type: "list",
        name: "id",
        message: "Which employee would you like to update?",
        choices: empArr
        },
        {
        type: "list",
        name: "title",
        message: "What is the employee's new title?",
        choices: roleArr
        }
    ])
    .then(answer => {
      connection.query(`
        UPDATE employee 
        SET role_id = ${JSON.stringify(answer.title)} 
        WHERE id = ${JSON.stringify(answer.id)}
        )`,
          function (err, result){
            if (err) throw err;
            console.table(result)
            menu();
          }
          )
        }
        )
      }
    


  module.exports = updateEmployee;