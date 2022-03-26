const inquirer = require("inquirer");
const Choice = require("inquirer/lib/objects/choice");
const db = require("./db");

function loadPrompts () {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "",
            choices: [
                {
                    name: "View all employees", 
                    value: "VIEW_EMPLOYEES"
                }
            ]
        }
    ]).then(res => {
        let choice = response.choice 
            switch(choice) {
                case "VIEW_EMPLOYEES":
                    viewEmployees()
                    break;
            }
        
    })
}

function viewEmployees() {
    db.findAllEmployees()
    .then(([rows]) => {
        console.table(rows)
    })
    .then(() => loadPrompts())
}