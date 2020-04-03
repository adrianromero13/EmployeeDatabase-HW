// add required files for use in server
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const mysql = require('mysql');

// create server connection for use of mysql
const connection = mysql.createConnecction({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: ''
});

// function to show error if connection not made
connection.connect(function (err) {
    if(err) throw err;
    
})
