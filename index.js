const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_db'
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
          case 'View all employees':
              viewEmployees();
              break;

          case 'View employee roles':
              viewRoles();
              break;

          case 'View all departments':
              viewDepartments();
              break;

          case 'Add an employee':
              addEmployee();
              break;

          case 'Add a new role':
                addRole();
                break;

          case 'Add a department':
              addDepartment();
              break;

          case 'Update employee role':
              updateRoles();
              break;
      }
  });
};

const viewEmployees = () => {
const query = 'SELECT * FROM employee';
connection.query(query, (err, res) => {
  if (err) throw err;
  console.log('All employees:');
  console.table(res);
  runPrompts();
});
};

const viewRoles = () => {
  const query = 'SELECT * FROM role';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log('Employee roles:');
    console.table(res);
    runPrompts();
  });
  };  

const viewDepartments = () => {
const query = 'SELECT * FROM department';
connection.query(query, (err, res) => {
  if (err) throw err;
  console.log('All departments:');
  console.table(res);
  runPrompts();
});
};

const addEmployee = () => {
inquirer
  .prompt([
      {
          name: "firstName",
          type: "input",
          message: "Enter employee's first name:"
      },
      {
          name: "lastName",
          type: "input",
          message: "Enter employee's last name:"
      },
      {
          name: "roleId",
          type: "input",
          message: "Enter employees role ID number:"
      },
      {
          name: "managerId",
          type: "input",
          message: "Enter ID of employee's manager:"
      }
  ]).then((answers) => {
      const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES ('${answers.firstName}','${answers.lastName}', '${answers.roleId}','${answers.managerId}')`;
      connection.query(query, (err, req) => {
          if (err) throw err
      });
      console.log('Employee has been added!');
      runPrompts();
  });
};

const addRole = () => {
  inquirer
    .prompt([
        {
            name: "title",
            type: "input",
            message: "Enter the name of the new role:"
        },
        {
            name: "salary",
            type: "input",
            message: "Enter the salary of the new role:"
        },
        {
            name: "departmentId",
            type: "input",
            message: "Enter the ID of the department this role will be added to:"
        }
    ]).then((answers) => {
        const query = `INSERT INTO role (title, salary, department_id)
        VALUES ('${answers.title}','${answers.salary}', '${answers.departmentId}')`;
        connection.query(query, (err, req) => {
            if (err) throw err
        });
        console.log('Role Has been added!');
        runPrompts();
    });
  };

const addDepartment = () => {
inquirer
  .prompt([
      {
          name: "departmentName",
          type: "input",
          message: "Enter the name of the new department:"
      }
  ]).then((answers) => {
      const query = `INSERT INTO department (name)
      VALUES ('${answers.departmentName}')`;
      connection.query(query, (err, req) => {
          if (err) throw err
      });
      console.log('Department has been added!');
      runPrompts();
  });
};

const updateRoles = () => {
inquirer
  .prompt([
      {
          name: "firstName",
          type: "input",
          message: "Enter the first name of the employee you want to update:"
      },
      {
          name: "role",
          type: "input",
          message: "Enter the new role ID you would like to assign:"
      }
  ]).then((answers) => {
      connection.query(
          'UPDATE employee SET ? WHERE ?',
          [
              {
                  role_id: answers.role
              },
              {
                  first_name: answers.firstName
              },
          ])
      console.log('Employee role has been updated!');
      runPrompts();
  });
};