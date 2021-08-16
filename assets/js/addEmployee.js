// Done.

const inquirer = require("inquirer");

var roleArr = {
  id: [],
  title: []
};
var employeeArr = {
  id: [],
  full_name: []
};

function roleList(connection) {
  connection.query(
    `
  SELECT id, title FROM role
      `,
    function (err, result) {
      if (err) throw err;
      for (let i = 0; i < result.length; i++) {
        roleArr.id.push(result[i].id);
        roleArr.title.push(result[i].title);
      }
      return roleArr;
    }
  );
}

function employeeIdList(connection) {
  connection.query(`
    SELECT  id, 
            CONCAT (first_name, ' ', last_name) AS full_name 
    FROM employee
        `,
    function (err, result) {
      if (err) throw err;
      for (let i = 0; i < result.length; i++) {
        employeeArr.id.push(result[i].id);
        employeeArr.full_name.push(result[i].full_name);
      }
      return employeeArr;
    }
  );
}

function addEmployee(connection, menu) {
  roleList(connection);
  employeeIdList(connection);

  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the first name of the new employee?",
        validate: (first_name) => {
          if (first_name) {
            return true;
          } else {
            console.log(
              "You need to input the first name of the new employee!"
            );
            return false;
          }
        },
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the last name of the new employee?",
        validate: (last_name) => {
          if (last_name) {
            return true;
          } else {
            console.log("You need to input the last name of the new employee!");
            return false;
          }
        },
      },
      {
        type: "list",
        name: "title",
        message: "What is the new employee's title?",
        choices: roleArr.title,
      },
      {
        type: "list",
        name: "manager_id",
        message: "What is the id of the new employee's manager?",
        choices: employeeArr.full_name,
      },
    ])
    .then((answer) => {
      var roleId;
      for (let i = 0; i < roleArr.title.length; i++) {
        if (answer.title === roleArr.title[i]) {
          roleId = roleArr.id[i];
        }
      }
      // console.log(roleId);

      var empId;
      for (let i = 0; i < employeeArr.full_name.length; i++) {
        if (answer.manager_id === employeeArr.full_name[i]) {
          empId = employeeArr.id[i];
        }
      }

      connection.query(
        `
      INSERT INTO employee (
          first_name, 
          last_name, 
          role_id, 
          manager_id) 
        VALUES (
          ${JSON.stringify(answer.first_name)},
          ${JSON.stringify(answer.last_name)},
          ${JSON.stringify(roleId)},
          ${JSON.stringify(empId)})
          `,
        function (err, result) {
          if (err) throw err;
          console.table(result);
          menu();
        }
      );
    });
}

module.exports = addEmployee;
