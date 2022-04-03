const inquirer = require("inquirer");
require("console.table");
const mysql = require("mysql2");
const db = require("./db");

// const connection = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "password",
//   database: "employees",
// });

// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     loadPrompts();
//   });



function loadPrompts () {
    return inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                
                 "View All Departments",
                 "View All Roles",
                 "View All Employees",
                 "Add A Department",
                 "Add A Role",
                 "Add An Employee",
                 "Update Employee Role",
                 "Quit"
            ]
        }
    ]).then(response => {
        let choice = response.choice 
            switch(choice) {
                case "View All Departments":
                    viewDepartments()
                    break;

                    case "View All Roles":
                    viewRoles()
                    break;

                    case "View All Employees":
                    viewEmployees()
                    break;

                    case "Add A Department":
                    addDepartment()
                    break;

                    case "Add A Role":
                    addRole()
                    break;

                    case "Add An Employee":
                    addEmployee()
                    break;

                    case "Update Employee Role":
                    updateRole()
                    break;

                    case "Quit":
                        console.log("Bye")
                        break;

            }
        
    })
}



function viewEmployees() {
    db.findAllEmployees()
    .then(([rows]) => {
        let employees = rows
        console.log("\n")
        console.table(employees)
    })
    .then(() => loadPrompts())
   
}

function viewDepartments() {
    db.findAllDepartments()
    .then(([rows]) => {
        let departments = rows
        console.log("\n")
        console.table(departments)
    })
    .then(() => loadPrompts())
   
}

function viewRoles() {
    db.findAllRoles()
    .then(([rows]) => {
        let roles = rows
        console.log("\n")
        console.table(roles)
    })
    .then(() => loadPrompts())
   
}


function addEmployee() {
    prompt([
        {
            name: "first_name",
            message: "What is the employees first name?"
        },

        {
            name: "last_name",
            message: "What is the employees last name?"
        },

        {
            name: "role",
            message: "What is the employees role?"
        },

        {
            name: "manager",
            message: "Who will be their manager?"
        }
    ])
    db.addEmployee()
    // const query = "SELECT role.title, role.salary, role.department_id FROM role"
}

function addDepartment() {
    prompt([
        {
            name: "department",
            message: "What is the department name?"
        },
    ])
    db.addDepartment()
    // const query = "SELECT role.title, role.salary, role.department_id FROM role"
}

const addRole = async () => {
    let [departments] = await query(`SELECT * FROM department`)
    await inquirer.prompt([
        {
            name: "role_name",
            message: "What is the name of the role?"
        },

        {
            name: "role_salary",
            message: "What is the salary of the role?"
        },

        {
            name: "role_department",
            message: "What department will the role be under?",
            choices: departments.map((departmentName) => {
                return {
                    name: departmentName.name,
                    value: departmentName.id
                }
            }),
        }
    ])
    .then((answer) => {
        title = answer.roleTitle
        salary = answer.roleSalary
        dept = answer.roleDept
        const sqlQuery = `INSERT INTO roles(title, salary, department_id) VALUES ("${title}", "${salary}", "${dept}")`;
        db.query(sqlQuery)
    })
    // const query = "SELECT role.title, role.salary, role.department_id FROM role"
}

function updateRole() {

}

loadPrompts();