const connection = require("../db/connection");
class DB { 
    constructor(connection) {
        this.connection = connection
    }
    findAllEmployees() {
        return this.connection.promise().query(
            'SELECT employee.id AS "ID Number", employee.first_name AS "First Name", employee.last_name AS "Last Name", role.title AS "Title", role.salary AS "Salary" FROM employee left join role on employee.role_id=role.id;'
        )
    }
    findAllDepartments() {
        return this.connection.promise().query(
            `SELECT department.id AS "Department ID", department.name AS "Department Name"  FROM department `
        )
    }

    findAllRoles() {
        return this.connection.promise().query(
            `SELECT role.title AS "Title", role.salary AS "Salary", department.name AS "Department" FROM employees.role LEFT JOIN employees.department ON role.department_id = department.id ORDER BY role.salary`
        )
    }
}













module.exports = new DB(connection);