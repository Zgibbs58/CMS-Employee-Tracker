require("console.table");
const db = require("../db/connection");
const init = require("../index");

function handleView(table) {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM ??", table, (err, results) => {
      if (err) {
        reject(err);
      }
      console.table(results);
      resolve();
    });
  });
}

function viewRoles() {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT roles.id, roles.title, departments.name AS department, roles.salary FROM roles JOIN departments ON roles.department_id = departments.id",
      (err, results) => {
        if (err) {
          reject(err);
        }
        console.table(results);
        resolve();
      }
    );
  });
}

function viewEmployees() {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT employees.id, employees.first_name, employees.last_name, roles.title AS title, departments.name AS department, roles.salary, CONCAT(managers.first_name, ' ', managers.last_name) AS manager FROM employees LEFT JOIN roles ON roles.id = employees.role_id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees AS managers ON employees.manager_id = managers.id",
      (err, results) => {
        if (err) {
          reject(err);
        }
        console.table(results);
        resolve();
      }
    );
  });
}

function selectRoles() {
  return db
    .promise()
    .query("SELECT * FROM roles")
    .then(([data]) => {
      return data.map(({ title, id }) => ({
        name: title,
        value: id,
      }));
    })
    .catch((err) => console.error(err));
}

function selectManagers() {
  return db
    .promise()
    .query("SELECT * FROM employees")
    .then(([data]) => {
      return data.map(({ first_name, last_name, id }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
      }));
    })
    .catch((err) => console.error(err));
}

function selectDepartments() {
  return db
    .promise()
    .query("SELECT * FROM departments")
    .then(([data]) => {
      return data.map(({ name, id }) => ({
        name: name,
        value: id,
      }));
    })
    .catch((err) => console.error(err));
}

function addEmployee(answer) {
  db.query("INSERT INTO employees SET ?", answer, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Employee added successfully!");
    }
  });
}

function addDepartment(answer) {
  db.query("INSERT INTO departments SET ?", answer, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Department added successfully!");
    }
  });
}

function addRole(answer) {
  db.query("INSERT INTO roles SET ?", answer, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Role added successfully!");
    }
  });
}

module.exports = {
  handleView,
  viewRoles,
  viewEmployees,
  selectRoles,
  selectManagers,
  addEmployee,
  addDepartment,
  selectDepartments,
  addRole,
};
