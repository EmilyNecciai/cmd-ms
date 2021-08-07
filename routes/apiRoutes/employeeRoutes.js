//ROUTES
// app.get('/', (req, res) => { //TEST ROUTE
//     res.json({
//       message: 'Hello World'
//     });
//   });

db.query(`SELECT * FROM employee`, (err, rows) => {
    console.log(rows);
});