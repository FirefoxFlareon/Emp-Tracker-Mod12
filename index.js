const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
});

connection.connect(err => {
    if (err) throw err;
    runPrompts();
  });

  const runPrompts = () => {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'Please choose an action',
        choices: [
            'View all employees',
            'View employee roles',
            'View all departments',
            'Add an employee',
            'Add a new role',
            'Add a department',
            'Update employee role'
        ]
    })
    .then((answer) => {
        switch (answer.action) {
            case 'View all employees': viewEmployees();
            break;

            case 'View employee roles': viewRoles();
            break;

            case 'View all departments': viewDepartments();
            break;

            case 'Add an employee': addEmployee();
            break;

            case 'Add a new role': addRole();
            break;

            case 'Add a department': addDepartment();
            break;

            case 'Update employee role': updateRoles();
            break;
        }
    })
  };