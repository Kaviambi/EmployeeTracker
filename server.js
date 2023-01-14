// Connect to database 
const mysql = require('mysql2');
const inquirer = require('inquirer');

//Connection 
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'mySQL@123',
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
                'Delete a department',
                'Delete a role',
                'Exit menu'
                // 'Salaries of all employees',
                // 'Update employee managers',
                // 'Delete an employees',
                // 'View employees by manager',
                // 'View employees by department',
            ],
        })
        .then(answers => {
            const { choices } = answers;

            if (choices === 'View all the departments') {
                viewAllDepartments();
            }

            if (choices === 'View all the roles') {
                viewAllRoles();
            }

            if (choices === 'View all employees') {
                viewAllEmployees();
            }

            if (choices === 'Add a role') {
                addARole();
            }

            if (choices === 'Add a department') {
                addADepartment();
            }

            if (choices === 'Add an employee') {
                addAnEmployee();
            }

            if (choices === 'Update an employee role') {
                updateEmployeeRole();
            }

            if (choices === 'Delete a department') {
                deleteDepartment();
            }

             if(choices === 'Delete a role'){
                deleteRole();
               }  

            if (choices === 'Exit menu') {
                db.end();
            }

            // if (choices === 'Salaries of all employees') {
            //     ViewSalary();
            // }
            //    if(choices === 'Update employee manager'){
            //     updateEmployeeManager();
            //    }  

            //     if(choices === 'View employees by department'){
            //     viewEmployeeByDepartment();
            //    }  
                //    if(choices === 'Delete an employee'){
            //     deleteEmployee();
            //    } 
        });
};

//View all the departments
viewAllDepartments = () => {
    const query = 'SELECT * FROM department';
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        menuPrompt();
    })

}

//view all the employee roles
viewAllRoles = () => {
    const query = 'SELECT * FROM employee_role';
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        menuPrompt();
    })

}

//View all the employees
viewAllEmployees = () => {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department.dept_name,employee_role.salary , 
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee manager
    RIGHT JOIN employee  
    ON employee.manager_id = manager.id 
    JOIN employee_role 
    ON employee.id = employee_role.id 
    JOIN department 
    ON department.id = employee_role.id ;`, (err, res) => {
        if (err) throw err;
        console.table(res);
        menuPrompt();
    })
};


addADepartment = () => {
    inquirer
        .prompt([
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
                (err, res) => {
                    if (err) throw err;
                    console.log(`${res} Department successfully Added`);
                    menuPrompt();
                });
        });
};

addARole = () => {

    inquirer.prompt([
        {
            type: 'input',
            name: 'rolename',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?'
        },
        {
            type: 'input',
            name: 'department',
            message: 'Which department you want to add?',


        },
    ]).then((answers) => {
        db.query(`INSERT INTO employee_role SET ?`,
            {
                title: answers.rolename,
                salary: answers.salary,
                department_id: answers.department,
            },
            (err, res) => {
                if (err) throw err;
                console.log(`${res} successfully added.`);
                menuPrompt();
            })
    })
}

addADepartment = () => {
    inquirer.prompt([
        {
            name: 'newDepartment',
            type: 'input',
            message: 'What is the name of the department you want to add?'
        }
    ]).then((answers) => {
        db.query(`INSERT INTO department SET ?`,
            {
                dept_name: answers.newDepartment,
            },
            (err, res) => {
                if (err) throw err;
                console.log(`${answers.newDepartment} is added to the database.`);
                menuPrompt();
            })
    })
};

addAnEmployee = () => {
    db.query(`SELECT * FROM employee_role;`, (err, res) => {
        if (err) throw err;
        roles = res.map(employee_role => ({ name: employee_role.title, value: employee_role.id }));

        inquirer.prompt([
            {
                name: 'firstname',
                type: 'input',
                message: 'What is the employee first name?'
            },
            {
                name: 'lastname',
                type: 'input',
                message: 'What is the employee last name?'
            },
            {
                name: 'emp_title',
                type: 'input',
                message: 'What is the employee title(role_id)?',
                choices: roles,
            },
            {
                name: 'managerId',
                type: 'list',
                message: 'Select a manager id?',
                choices: [1, 2, 3, 4]
            }
        ])
            .then((answers) => {
                db.query(`INSERT INTO employee SET ?`,
                    {
                        first_name: answers.firstname,
                        last_name: answers.lastname,
                        role_id: answers.employee_role,
                        manager_id: answers.managerId,
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log(`${res} is added to the database`);
                        menuPrompt();
                    }
                );
            });

    });
};
deleteDepartment = () => {
    db.query(`SELECT * FROM department;`, (err, res) => {
        if (err) throw err;
        departments = res.map(department => ({ name: department.dept_name, value: department.id }));
        inquirer.prompt([
            {
                name: 'depName',
                type: 'list',
                message: 'Which department you want to delete?',
                choices: departments
            },
        ])
            .then((answers) => {
                db.query(`DELETE FROM department WHERE ?;`,
                    [
                        {
                            id: answers.depName,

                        },
                    ],
                    (err, res) => {
                        if (err) throw err;
                        console.log(`Department is deleted from the database`);
                        menuPrompt();
                    })
            })
    })
}

deleteRole = () => {
    db.query(`SELECT * FROM employee_role;`, (err, res) => {
        if(err) throw err;
        roles = res.map(employee_role => ({name: employee_role.title, value: employee_role.id}));
        inquirer.prompt([
            {
                name: 'roleName',
                type: 'list',
                message: 'Which role you want to delete?',
                choices: roles
            },
        ]).then((answers) => {
            db.query(`DELETE FROM employee_role WHERE ?;`,
            [
                {
                    id: answers.roleName,
                },
            ],
            (err, res) => {
                if(err) throw err;
                console.log('Role is deleted from the database');
                menuPrompt();
            })
        })
    })
}

updateEmployeeRole = () => {
    db.query(`SELECT * FROM employee;`, (err, res) => {
        if (err) throw err;
        employees = res.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }));

  
    db.query(`SELECT * FROM employee_role;`, (err, res) => {
        if (err) throw err;
        roles = res.map(employee_role => ({ name: employee_role.title, value: employee_role.id }));
   
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'selectEmployee',
                message: 'which employee/s role you want to update?',
                choices: employees,
            },
            {
                type: 'list',
                name: 'selectNewRole',
                message: 'Which role do you want to assign the selected employee?',
                choices: roles
            },
        ])
        .then((answers) => {
            db.query(`UPDATE employee SET ? WHERE ?`,
                [
                    {
                        role_id: answers.selectNewRole,
                    },
                    {
                        id: answers.selectEmployee,
                    }
                ],
                (err, res) => {
                    if (err) throw err;
                    console.log('Role updated');
                    menuPrompt();
                })
        })
    });
});
}

// ViewSalary = () => {
//     db.query(`SELECT * FROM department;`, (err, res) => {
//         if (err) throw err;
//         departments = res.map(department => ({ name: department.dept_name, value: department.department_id }));
//         inquirer
//             .prompt([
//                 {
//                     name: 'deptName',
//                     type: 'list',
//                     message: 'Which department salary you would like to see?',
//                     choices: departments
//                 },
//             ]).then((answers) => {
//                 db.query(`SELECT SUM(employee_role.salary) FROM employee_role WHERE ?;`,
//                     [
//                         {
//                             id: answers.deptName,
//                         },
//                     ],
//                     (err, res) => {
//                         if (err) throw err;
//                         console.log(`${answers.deptName}`);
//                         menuPrompt();
//                     })
//             })
//     })
// }

menuPrompt();

// module.exports = db;