// Done.

function getDepartments(connection, menu){
  connection.query(`SELECT * FROM department ORDER BY department.id ASC;
  `,
  function (err, result) {
    if (err) throw err;
    console.table(result)
    menu();
  })         
}

module.exports = getDepartments;
