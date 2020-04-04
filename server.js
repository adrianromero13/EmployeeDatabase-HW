// add required files for use in server
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');

// create server connection for use of mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_db'
});

// function to show error if connection not made
connection.connect(function (err) {
    if(err) throw err;
    search();
})

// write function to run search based on parameters input
// use inquirer to prompt in console for user to make choice
function search() {
    inquirer
        .prompt({
            type: 'list',
            name: 'action',
            message: "What would you like to do?",
            choices: ["View all employees",
                "View all departments",
                "View all managers",
                "Add Employee",
                "Add Department",
                "Add Role",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "exit"
            ]})
            // write .then function to allow user to select subcategories based on selected choices
            .then(function (answer) {
                console.log(answer.action);
                switch (answer.action) {
                    case "View all employees":
                        viewEmployees();
                    break;

                    case "View all departments":
                        viewDepartment();
                    break;
                    
                    case "View all managers":
                        viewManager();
                    break;

                    case "Add Employee":
                        addEmployee();
                    break;

                    case "Add Department":
                        addDepartment();
                    break;

                    case "Add Role":
                        addRole();
                    break;

                    case "Remove Employee":
                        removeEmployee();
                    break;

                    case "Update Employee Role":
                        updateEmployee();
                    break;

                    case "exit":
                        connection.end();
                    break;
                }
            });
            
        }
        
// create function for viewing employees
function viewEmployees() {
    //run conection.query to display all employees 
    connection.query("SELECT * FROM employee", function(err, res) {
        console.table(res);
        search();
    });
  
}

function viewDepartment() {
    // create funciton to view departments available
    connection.query("SELECT * FROM department", function(err, data) {
        // set up console.table to let user see table
        console.table(data);
        search();
    })
}


// create function to view managers available
function viewManager() {
    connection.query("SELECT id, first_name, last_name FROM employee WHERE (manager_id IS NOT NULL)",
        function(err, res) {
            console.table(res);
            search();
        });
}

// create function to add employee
function addEmployee() {
    // prompt user for info on new employee
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the employees first name?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the employees last name?'
        },
        {
            type: 'number',
            name: 'roleId',
            message: 'What is the employees role ID'
        },
        {
            type: 'number',
            name: 'managerId',
            message: "What is the employees manager's ID?"
        }
    ])
    // use user input to make push into table
    .then(function(res) {
        // create connection.query
        connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) Values (?, ?, ?, ?)',
            [res.firstName, res.lastName, res.roleId, res.managerId],
            function(err, data) {
                if (err) throw err;
                console.log(`Employee ${[res.firstName]} ${[res.lastName]}, role ID ${[res.roleId]} was successfully added.
                They will report to manager ID: ${[res.managerId]}.`);
                search();
            })
    })
}

// //create function to add department to the database
// function addDepartment() {

// }

// // create function to add role
// function addRole() {
//     // prompt user what the new role is
//     // create then function to use input to create variable with the answer

//     // prompt user to input salary for new role
//     // create then function to use input as new salary

//     // prompt user to input new id for the role
//     // then function to create id and use in database
// }

// // create function to remove employee
// function removeEmployee() {
//     // prompt to remove employee by id
//     // then function to delete employee from database using answer

// }

// // function to update existing employees
// function updateEmployee() {
//     // use inquirer to prompt user to enter employee id being updated
//     // then function to create id variable

//     // inquirer promptto ask about role id
//     // then function to update role id
// }


// // create function to update an employee's manager
// function employeeManager() {
//     // inquirer prompt to ask what employee would the user like to update the manager
//     // then function to use answer and change info in mysql table
// }