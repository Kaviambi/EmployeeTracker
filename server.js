// Connect to database 
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');



const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employeeTracker'
    });

console.log(`Connected to the database.`);

const menuPrompt = () => {
    inquirer
        .prompt({
            name: 'choices',
            type: 'list',
            message: 'What action do you want to do?',
            choices: ['View all the departments',
                'View all the roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Update employee managers',
                'View employees by manager',
                'View employees by department',
                'Delete a department',
                'Delete a role',
                'Delete an employees',
                'Salaries of all employees',
                'Exit menu'
            ],
        })
        .then(answers => {
           const {choices} = answers;

           if(choices === 'View all the departments') {
            viewAllDepartments();
           }

           if(choices === 'View all the roles') {
            viewAllRoles();
           }

           if(choices === 'View all employees'){
            viewAllEmployees();
           }

           if(choices === 'Add a department'){
            addADepartment();
           }

           if(choices === 'Add a role'){
            addARole();
           }  
           
           if(choices === 'Add an employee'){
            addAnEmployee();
           }  
           
           if(choices === 'Update an employee role'){
            updateEmployeeRole();
           } 
           
           
           if(choices === 'Update employee manager'){
            updateEmployeeManager();
           }  
           
        if(choices === 'View employees by department'){
            viewEmployeeByDepartment();
           }  
           
           if(choices === 'Delete a department'){
            deleteDepartment();
           } 
           
           if(choices === 'Delete a role'){
            deleteRole();
           }  
           
           if(choices === 'Delete an employee'){
            deleteEmployee();
           } 
           
           if(choices === 'Salaries of all employees'){
            salaryOfEmployee();
           }

           if(choices === 'Exit menu'){
            Connection.end();
           }


        });
    };
        
 viewAllDepartments = () => {
    const query = 'SELECT * FROM department';
    db.query( query, (err, res) => {
        if(err) throw err;
        console.table(res);
        menuPrompt(); 
    })
   
}

 viewAllRoles = () => {
    const query = 'SELECT * FROM employee_role';
    db.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);
        menuPrompt();
    })
   
}

 viewAllEmployees = () => {
    const query = 'SELECT * FROM employee';
    db.query(query, (err,res) => {
        if(err) throw err;
        console.table(res);
        menuPrompt();
    })
}

addADepartment = () => {
    inquirer
    .prompt ([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department you want to add?'
        }
    ]).then((answers) => {
        db.query(`INSERT INTO department SET ?`, 
        {
            dept_name: answers.department,
        },
        (err,res) => {
            if(err) throw err;
            console.log(`${res} Department successfully Added`);
            menuPrompt();
        });
    });
};







menuPrompt();

// module.exports = db;