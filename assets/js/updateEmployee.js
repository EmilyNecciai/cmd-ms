// Done, but something is broken.

const inquirer = require("inquirer");

var employeeArr = [];

// function employeeIdList(connection) {
//   connection.query(
//     `
//   SELECT id FROM employee
//       `,
//     function (err, result) {
//       if (err) throw err;
//       for (let i = 0; i < result.length; i++) {
//         employeeArr.push(result[i].id);
//       }
//       return employeeArr;
//     }
//   );
// }

var roleArr = [];

// function roleList(connection) {
//   connection.query(
//     `
//   SELECT id FROM role
//       `,
//     function (err, result) {
//       if (err) throw err;
//       for (let i = 0; i < result.length; i++) {
//         roleArr.push(result[i].id);
//       }
//       return roleArr;
//     }
//   );
// }

function updateEmployee(connection, menu) {
  // roleList(connection);
  //employeeIdList(connection);
  // console.log(employeeArr)
  connection.query("SELECT * FROM employee", function (err, result) {
    if (err) throw err;
    for (let i = 0; i < result.length; i++) {
      employeeArr.push(result[i].id);
    }
    connection.query(
      `
    SELECT id FROM role
        `,
      function (err, result) {
        if (err) throw err;
        for (let i = 0; i < result.length; i++) {
          roleArr.push(result[i].id);
        }

        inquirer
          .prompt([
            {
              type: "list",
              name: "id",
              message: "Which employee would you like to update?",
              choices: employeeArr,
            },
            {
              type: "list",
              name: "title",
              message: "What is the employee's new title?",
              choices: roleArr,
            },
          ])
          .then((answer) => {
            connection.query(
              `
        UPDATE employee 
        SET role_id = ${JSON.stringify(answer.title)} 
        WHERE id = ${JSON.stringify(answer.id)}
        `,
              function (err, result) {
                if (err) throw err;
                console.table(result);
                menu();
              }
            );
          });
      }
    );
  });
}

module.exports = updateEmployee;
