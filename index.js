const inquirer = require("inquirer");
const prompt = inquirer.createPromptModule();
const queries = require("./lib/queries");

function init() {
  prompt({
    type: "list",
    name: "query",
    message: "Select an option",
    choices: [
      "View all employees",
      "Add an employee",
      "Update Employee Role",
      "View all roles",
      "Add a role",
      "View all departments",
      "Add a department",
      "Exit",
    ],
  }).then((answer) => {
    switch (answer.query) {
      case "View all employees":
        queries.viewEmployees().then(init);
        break;

      case "View all roles":
        queries.viewRoles().then(init);
        break;

      case "View all departments":
        // handleView is a function that takes in a table name, queries the database for that table, and logs the results to the console.
        queries.handleView("departments").then(init);
        break;

      case "exit":
        process.exit();

      case "Add a role":
        prompt([
          {
            type: "input",
            name: "title",
            message: "What is the name of the role?",
          },

          {
            type: "input",
            name: "salary",
            message: "What is the salary of the role?",
          },
          {
            type: "list",
            name: "department_id",
            message: "Which department does the role belong to?",
            choices: queries.selectDepartments,
          },
        ])
          .then(queries.addRole)
          .then(init);
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
            choices: queries.selectRoles,
          },
          {
            type: "list",
            name: "manager_id",
            message: "Who is the employee's manager?",
            choices: queries.selectManagers,
          },
        ])
          .then(queries.addEmployee)
          .then(init);
        break;

      case "Update Employee Role":
        prompt([
          {
            type: "list",
            name: "id",
            message: "Which employee's role would you like to update?",
            choices: queries.selectEmployees,
          },
          {
            type: "list",
            name: "role_id",
            message: "What is the employee's new role?",
            choices: queries.selectRoles,
          },
        ])
          .then(queries.updateEmployeeRole)
          .then(init);
        break;

      case "Add a department":
        prompt([
          {
            type: "input",
            name: "name",
            message: "What is the name of the department you would like to add?",
          },
        ])
          .then(queries.addDepartment)
          .then(init);
        break;
    }
  });
}

init();

module.exports = init;
