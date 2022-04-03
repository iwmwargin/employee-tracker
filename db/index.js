const connection = require("../db/connection");
class DB { 
    constructor(connection) {
        this.connection = connection
    }
    findAllEmployees() {
        return this.connection.promise().query(
            'SELECT employee.id, employee.first_name, employee.last_name , role.title, role.salary FROM employee left join role on employee.role_id=role.id;'
        )
    }
    findAllDepartments() {
        return this.connection.promise().query(
            `SELECT department.id AS "Department ID", department.name AS "Department Name"  FROM department `
        )
    }

    findAllRoles() {
        return this.connection.promise().query(
            `SELECT role.title, role.salary, department.name FROM employees.role LEFT JOIN employees.department ON role.department_id = department.id ORDER BY role.salary`
        )
    }
}













module.exports = new DB(connection);