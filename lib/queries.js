require("console.table");
const db = require("../db/connection");

// Start of Functions for viewing tables
function handleView(table) {
  return new Promise((resolve, reject) => {
    db.query("SELECT id AS Id, name AS Name FROM ??", table, (err, results) => {
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
      "SELECT roles.id AS Id, roles.title AS Title, departments.name AS Department, roles.salary AS Salary FROM roles JOIN departments ON roles.department_id = departments.id",
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
      "SELECT employees.id AS Id, employees.first_name AS First_Name, employees.last_name AS Last_Name, roles.title AS Title, departments.name AS Department, roles.salary AS Salary, CONCAT(managers.first_name, ' ', managers.last_name) AS Manager FROM employees LEFT JOIN roles ON roles.id = employees.role_id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees AS managers ON employees.manager_id = managers.id",
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
// End of Functions for viewing tables

// Start of Functions for selecting data
function selectRoles() {
  return (
    db
      .promise()
      .query("SELECT * FROM roles")
      // [data] is destructuring the first element of the array returned by the query
      // data is an array of objects inside of an array
      .then(([data]) => {
        return data.map(({ title, id }) => ({
          name: title,
          value: id,
        }));
      })
      .catch((err) => console.error(err))
  );
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

function selectEmployees() {
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
// End of Functions for selecting data

// Start of Functions for adding data
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

function updateEmployeeRole(answer) {
  db.query("Update employees SET role_id = ? WHERE id = ?", [answer.role_id, answer.id], (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Employee role updated successfully!");
    }
  });
}

function updateEmployeeManager(answer) {
  db.query("Update employees SET manager_id = ? WHERE id = ?", [answer.manager_id, answer.id], (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Employee manager updated successfully!");
    }
  });
}
// End of Functions for adding data

module.exports = {
  handleView,
  viewRoles,
  viewEmployees,
  selectRoles,
  selectManagers,
  addEmployee,
  addDepartment,
  selectDepartments,
  selectEmployees,
  addRole,
  updateEmployeeRole,
  updateEmployeeManager,
};
