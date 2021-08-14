// Done.

function getEmployees(connection, menu){
    connection.query(`
    SELECT
        employee.id AS id,
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
    ORDER BY employee.id ASC;
    `, 
    function (err, result){
        if (err) throw err;
        console.table(result)
        menu();
    })         
}

module.exports = getEmployees;