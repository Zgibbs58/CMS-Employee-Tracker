const inquirer = require("inquirer");
const prompt = inquirer.createPromptModule();
const {
  handleView,
  viewRoles,
  viewEmployees,
  addEmployee,
  addDepartment,
  addRole,
  updateEmployeeRole,
  updateEmployeeManager,
} = require("./lib/queries");
const {
  mainMenuQuestions,
  addRoleQuestions,
  addEmpQuestions,
  addEmpRoleQuestions,
  addDepartmentQuestions,
  addEmpManagerQuestions,
} = require("./lib/questions");

function init() {
  prompt(mainMenuQuestions).then((answer) => {
    switch (answer.query) {
      case "View all employees":
        viewEmployees().then(init);
        break;

      case "View all roles":
        viewRoles().then(init);
        break;

      case "View all departments":
        // handleView is a function that takes in a table name, queries the database for that table, and logs the results to the console.
        handleView("departments").then(init);
        break;

      case "Add a role":
        prompt(addRoleQuestions).then(addRole).then(init);
        break;

      case "Add an employee":
        prompt(addEmpQuestions).then(addEmployee).then(init);
        break;

      case "Update Employee Role":
        prompt(addEmpRoleQuestions).then(updateEmployeeRole).then(init);
        break;

      case "Update Employee Manager":
        prompt(addEmpManagerQuestions).then(updateEmployeeManager).then(init);
        break;

      case "Add a department":
        prompt(addDepartmentQuestions).then(addDepartment).then(init);
        break;

      default:
        process.exit(0);
    }
  });
}

init();

module.exports = init;
