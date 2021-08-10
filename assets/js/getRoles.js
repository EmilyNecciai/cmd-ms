function getRoles(connection, menu){
    connection.query(`
    SELECT role.title, role.salary, department.name 
        AS department_name
        FROM role 
        LEFT JOIN department 
        ON role.department_id = department.id
        `, 
        function (err, result){
            if (err) throw err;
            console.table(result)
            menu();
        })         
    }
    
    module.exports = getRoles;

