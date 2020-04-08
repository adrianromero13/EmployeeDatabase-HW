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
    if (err) throw err;
    search();
});

// write function to run search based on parameters input
function search() {
    // use inquirer to prompt in console for user to make choice
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
                "Remove Department",
                "exit"
            ]
        })
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

                case "Remove Department":
                    removeDepartment();
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
    connection.query("SELECT * FROM employee", function (err, res) {
        console.table(res);
        search();
    });

}

function viewDepartment() {
    // create funciton to view departments available
    connection.query("SELECT * FROM department", function (err, data) {
        // set up console.table to let user see table
        console.table(data);
        search();
    });
}


// create function to view managers available
function viewManager() {
    connection.query("SELECT id, first_name, last_name FROM employee WHERE (manager_id IS NOT NULL)",
        function (err, res) {
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
            message: "What is the employees manager ID?"
        }
    ])
        // use user input to make push into table
        .then(function (res) {
            // create connection.query
            connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) Values (?, ?, ?, ?)',
                [res.firstName, res.lastName, res.roleId, res.managerId],
                function (err, data) {
                    if (err) throw err;
                    console.log(`Employee ${[res.firstName]} ${[res.lastName]}, role ID ${[res.roleId]} was successfully added.
                They will operate as manager ID: ${[res.managerId]}.`);
                    search();
                });
        });
}

//create function to add department to the database
function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'department',
                message: "What is the department that you want to add?"
            }
        ]).then(function (res) {
            // create connection.query to gather info
            connection.query('INSERT INTO department (name) Values (?)',
                [res.department],
                function (err, res) {
                    if (err) throw err;
                    console.log(`Department of ${[res.department]} was successfully created.`);
                    search();
                });
        });

}

// // create function to add role
function addRole() {
    // prompt user what the new role is
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "enter title:"
        },
        {
            type: "number",
            name: "salary",
            message: "enter salary:"
        },
        {
            type: "number",
            name: "department_id",
            message: "enter department ID:"
        }
    ])
        // run a then function to return information returned to database
        .then(function (res) {
            connection.query("INSERT INTO role (title, salary, department_id) values (?, ?, ?)",
                [res.title, res.salary, res.department_id],
                function (err, res) {
                    if (err) throw err;
                    console.log(`${[res.title]} was successfully created!`);
                    search();
                });
        });
}

// // create function to remove employee
function removeEmployee() {
    // prompt to remove employee by id
    inquirer
        .prompt(
            {
                name: 'removeEmployee',
                type: 'input',
                message: "Please enter Employee id you wish to REMOVE."
            }
        )
        // then function to delete employee from database using answer
        .then(function (answer) {
            let query = "DELETE FROM employee WHERE ?";
            let removeID = Number(answer.removeEmployee);
            console.table(query);

            // create connection query to remove from database
            connection.query(query, { id: removeID }, function (err, res) {
                if (err) throw (err);
                console.log(`Employee ${answer.removeEmployee} has been removed.`)
                search();
            });
        });
}
function removeDepartment() {
    inquirer
        .prompt(
            {
                name: 'removeDepartment',
                type: 'input',
                message: "Please enter the Department id you wish to remove."
            }
        )
        .then(function (answer) {
            let query = "DELETE FROM department WHERE ?";
            let rmDepID = Number(answer.removeDepartment);
            
            // this is broken trying to reset id's 
            // connection.query("ALTER TABLE department AUTO_INCREMENT ?", { id: rmDepID}, function (err, res){
                //     if (err) throw (err);
                //     console.log("Department ID's have been reset.");
                // })
            // create the connection.query to remove department based on id
                connection.query(query, { id: rmDepID }, function (err, res) {
                if (err) throw (err);
                console.log(`Department number ${rmDepID} has been removed.`);
                search();
                })

        })
}
