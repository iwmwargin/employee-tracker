const inquirer = require("inquirer");
require("console.table");
const mysql = require("mysql2");
const { connection } = require("./db");
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
                        quit();
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
var roleChoice = []
var managerChoice = []
var managerQuery = `SELECT * FROM employee`
var query = `SELECT * FROM role`
connection.query(query, (err, data) => {
    if (err) throw err;
    roleChoice = data.map(({ id, title }) => (
        {
            name: title,
            value: id
        }
    ))
});
connection.query(managerQuery, (err, data) => {
    if (err) throw err;
    managerChoice = data.map(({ id, first_name, last_name}) => (
        {
            name: first_name + last_name,
            value: id
        }
    ))
    managerChoice.push({ name: "none", value: null })


    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "What is the employees first name?"
        },

        {
            name: "last_name",
            type: "input",
            message: "What is the employees last name?"
        },

        {
            name: "role",
            type: "list",
            message: "What is the employees role?",
            choices: roleChoice
        },

        {
            name: "manager",
            type: "list",
            message: "Who will be their manager?",
            choices: managerChoice
        }
    ])
    .then((answers) => {
        console.log(answers)
        const empQuery = ` INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answers.first_name}", "${answers.last_name}", "${answers.role}", "${answers.manager}")`
        connection.query(empQuery, (err) => {
            if (err) throw err;
            console.log("Employee Added!")
            loadPrompts();
        })
    })
    
})
    
    // const query = "SELECT role.title, role.salary, role.department_id FROM role"
}

function addDepartment() {
    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "What department would you like to add?"
        },
    ])
    .then((answers) => {
        const addDept = `INSERT INTO department (name) VALUES ("${answers.department}")`
        connection.query(addDept, (err) => {
            if (err) throw err;
            console.log("Department Added!")
            loadPrompts();
        })
    })
    // const query = "SELECT role.title, role.salary, role.department_id FROM role"
}

function addRole() {
    let deptChoices = []
    let departments =  `SELECT * FROM department`
    connection.query(departments, (err, data) => {
        if (err) throw err;
        deptChoices = data.map(({ id, department}) => (
            {
                name: department, 
                value: id
            }
        ))
    
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What is the name of the role?"
        },

        {
            name: "salary",
            type: "input",
            message: "What is the salary of the role?"
        },

        {
            name: "dept",
            type: "list",
            message: "What department will the role be under?",
            choices: deptChoices
        }
    ])
    .then((answers) => {
        // title = answer.roleTitle
        // salary = answer.roleSalary
        // dept = answer.roleDept
        const sqlQuery = `INSERT INTO role(title, salary, department_id) VALUES ("${answers.name}", "${answers.salary}", "${answers.dept}")`
        connection.query(sqlQuery, (err) => {
            if (err) throw err;
            console.log("Role Added")
            loadPrompts();
        })
    })
    })
    // const query = "SELECT role.title, role.salary, role.department_id FROM role"
}

function updateRole() {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: " What is the employees ID number?"
        }
    ])
        .then((answers) => {
            connection.query("SELECT role.id, role.title FROM role ORDER BY role.id", async (err, res) => {
                if (err) throw err;
                const { role } = await inquirer.prompt([
                    {
                        name: "role",
                        type: "list",
                        message: " What is the employees new role?",
                        choices: () => res.map(res => res.title)
                    }
                ]);
                let roleId;
                for (const row of res) {
                    if (row.title === role) {
                        roleId = row.id;
                        continue;
                    }
                }
                    connection.query(` UPDATE employee SET role_id = ${roleId} WHERE employee.id = ${answers.id}`,
                    async (err, res) => {
                        if (err) throw err;
                        console.log("\n")
                        console.log("Employee Updated!")
                        console.log("\n")
                        loadPrompts();
                    })
            })
        })
}

function quit() {
    connection.end();
}

loadPrompts();
