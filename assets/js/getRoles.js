// Done.

function getRoles(connection, menu){
    connection.query(`
    SELECT role.id, role.title, role.salary, department.name 
        AS department_name
        FROM role 
        LEFT JOIN department 
        ON role.department_id = department.id
        ORDER BY role.id ASC;
        `, 
        function (err, result){
            if (err) throw err;
            console.table(result)
            menu();
        })         
    }
    
    module.exports = getRoles;

