const inquirer = require("inquirer");
const prompt = inquirer.createPromptModule();
require("console.table");
const db = require("./db/connection");

function initialPrompt() {
  prompt({
    type: "list",
    name: "query",
    message: "Select an option",
    choices: ["View all departments", "View all roles", "View all employees", "Add an employee", "Add a department"],
  }).then((answer) => {
    switch (answer.query) {
      case "View all employees":
        viewEmployees();
        break;

      case "View all roles":
        viewRoles();
        break;

      case "View all departments":
        // handleView is a function that takes in a table name, queries the database for that table, and logs the results to the console.
        handleView("departments");
        break;

      case "Add an employee":
        prompt([
          {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?",
          },
          {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?",
          },
          {
            type: "list",
            name: "role_id",
            message: "What is the employee's role?",
            choices: selectRoles,
          },
          {
            type: "list",
            name: "manager_id",
            message: "Who is the employee's manager?",
            choices: selectManagers,
          },
        ]).then(addEmployee);
        break;
      case "Add a department":
        prompt([
          {
            type: "input",
            name: "name",
            message: "What is the name of the department you would like to add?",
          },
        ]).then(addDepartment);
        break;
    }
  });
}

function handleView(table) {
  db.query("SELECT * FROM ??", table, (err, results) => {
    if (err) {
      return console.error(err);
    }
    console.table(results);
    initialPrompt();
  });
}

function viewRoles() {
  db.query(
    "SELECT roles.id, roles.title, departments.name AS department, roles.salary FROM roles JOIN departments ON roles.department_id = departments.id",
    (err, results) => {
      if (err) {
        return console.error(err);
      }
      console.table(results);
      initialPrompt();
    }
  );
}

function viewEmployees() {
  db.query(
    "SELECT employees.id, employees.first_name, employees.last_name, roles.title AS title, departments.name AS department, roles.salary, CONCAT(managers.first_name, ' ', managers.last_name) AS manager FROM employees JOIN roles ON roles.id = employees.role_id JOIN departments ON roles.department_id = departments.id LEFT JOIN employees AS managers ON employees.manager_id = managers.id",
    (err, results) => {
      if (err) {
        return console.error(err);
      }
      console.table(results);
      initialPrompt();
    }
  );
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

function addEmployee(answer) {
  db.query("INSERT INTO employees SET ?", answer, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Employee added successfully!");
      initialPrompt();
    }
  });
}

function addDepartment(answer) {
  db.query("INSERT INTO departments SET ?", answer, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Department added successfully!");
      initialPrompt();
    }
  });
}

initialPrompt();
