const mysql2 = require('mysql2');
const inquirer = require('inquirer');
const table = require('console.table');

//create connection to port3306
const connection = mysql2.createConnection({
host: 'localhost',
port: '3306',
user: 'root',
password: 'xUgC9zYUJ8',
database: 'employees_db',
});

//if connected to server run promptUser(), else throw error message
connection.connect((err) => {
    if (err) throw err;
    console.log(`Connected as id: ${connection.threadId}`);
    promptUser();
});

//inquirer prompts
function promptUser() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "choice",
                choices: [
                    "View Departments",
                    "View All Roles",
                    "View All Employees",
                    "Add Department",
                    "Add Role",
                    "Add Employee",
                    "Delete Department",
                    "Delete Role",
                    "Delete Employee",
                    "Exit",
                ],
            },
        ])
    .then(function (val) {
        switch (val.choice) {
            case "View Departments":
                viewDepartments();
            break;

            case "View All Roles":
                viewRoles();
            break;

            case "View All Employees":
                viewAllEmployees();
            break;

            case "Add Role":
                addRole();
            break;

            case "Add Department":
                addDepartment();
            break;

            case "Add Employee":
                addEmployee();
            break;

            case "Delete Department":
                deleteDepartment();
            break;

            case "Delete Role":
                deleteRole();
            break;

            case "Delete Employee":
                deleteEmployee();
            break;

            case "Exit":
                connection.end();
            break;
        }
    });
}

const managerArray = [];
function selectManager() {
    connection.query(
      "SELECT first_name, last_name FROM employee WHERE manager_id IS NULL",
      function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          managerArray.push(res[i].first_name);
        }
      }
    );
    return managerArray;
}
  
const roleArray = [];
function selectRole() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            roleArray.push(res[i].title);
        }
    });
    return roleArray;
}
  
function addRole() {
    connection.query(
      "SELECT role.title AS Title, role.salary AS Salary FROM role",
    function (err, res) {
        inquirer
            .prompt([
                {
                type: "input",
                message: "What is the new role?",
                name: "title",
                },
                {
                type: "input",
                message: "What is the salary for the new role?",
                name: "salary",
                },
            ])
        .then(function (res) {
            connection.query(
              "INSERT INTO role SET ?",
            {
                title: res.title,
                salary: res.salary,
            },
            function (err) {
                if (err) throw err;
                console.table(res);
                promptUser();
            });
        });
    });
}
  
function addDepartment() {
    inquirer
        .prompt([
            {
            type: "input",
            message: "What department would you like to add?",
            name: "department",
            },
        ])
    .then(function (res) {
        connection.query(
          "INSERT INTO department SET ? ",
        {
            name: res.department,
        },
        function (err) {
            if (err) throw err;
            console.table(res);
            promptUser();
        });
    });
}
  
function viewAllEmployees() {
    connection.query(
        "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      promptUser()
    })
}
  
function viewRoles() {
    connection.query(
        "SELECT role.title, role.id, role.salary FROM role ",
    function (err, res) {
        if (err) throw err;
        console.table(res);
        promptUser();
    });
}
  
function viewDepartments() {
    connection.query("SELECT * FROM department;", function (err, res) {
      if (err) throw err;
      console.table(res);
      promptUser();
    });
}
  
function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the employee's first name?",
                name: "firstName",
            },
            {
                type: "input",
                message: "What is the employee's last name?",
                name: "lastName",
            },
            {
                type: "list",
                message: "What is the employee's role?",
                name: "role",
                choices: selectRole(),
            },
            {
                type: "list",
                message: "Who is the employee's manager?",
                name: "manager",
                choices: selectManager(),
            },
        ])
    .then(function (val) {
        var roleId = selectRole().indexOf(val.role) + 1;
        var managerId = selectManager().indexOf(val.manager) + 1;
        connection.query(
          "INSERT INTO employee SET ?",
        {
            first_name: val.firstName,
            last_name: val.lastName,
            manager_id: managerId,
            role_id: roleId,
        },
        function (err) {
            if (err) throw err;
            console.table(val);
            promptUser();
        });
    });
}

const deleteEmployee = () => {
    connection.query(
        "SELECT employee.id, employee.first_name, employee.last_name FROM employee;",
        (err, res) => {
            if (err) throw err;
            console.table(res);
            inquirer.prompt([
                {
                    type: "input",
                    message: "Choose the ID of the employee that you want to delete:",
                    name: "employee"
                },
            ]).then((value) => {
                connection.query(
                    `DELETE FROM employee WHERE id = ?;`,
                    [value.employee],
                    (err, res) => {
                        if (err) throw err;
                        console.log("Employee deleted");
                        console.table(res);
                        promptUser();
                    })
            })
        })
}

const deleteRole = () => {
    connection.query(
        "SELECT role.id, role.title, role.salary, role.department_id FROM role;",
        (err, res) => {
            if (err) throw err;
            console.table(res);
            inquirer.prompt([
                {
                    type: "input",
                    message: "Choose the ID of the role that you want to delete:",
                    name: "role"
                },
            ]).then((value) => {
                connection.query(
                    `DELETE FROM role WHERE id = ?;`,
                    [value.role],
                    (err, res) => {
                        if (err) throw err;
                        console.log("Role deleted");
                        console.table(res);
                        promptUser();
                    })
            })
        })
}

const deleteDepartment = () => {
    connection.query(
        "SELECT department.id, department.name FROM department;",
        (err, res) => {
            if (err) throw err;
            console.table(res);
            inquirer.prompt([
                {
                    type: "input",
                    message: "Choose the ID of the department that you want to delete:",
                    name: "department"
                },
            ]).then((value) => {
                connection.query(
                    `DELETE FROM department WHERE id = ?;`,
                    [value.department],
                    (err, res) => {
                        if (err) throw err;
                        console.log("Department deleted");
                        console.table(res);
                        promptUser();
                    })
            })
        })
}