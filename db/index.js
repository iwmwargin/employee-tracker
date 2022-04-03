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
            `SELECT * FROM department `
        )
    }

    findAllRoles() {
        return this.connection.promise().query(
            `SELECT * FROM role`
        )
    }
}













module.exports = new DB(connection);