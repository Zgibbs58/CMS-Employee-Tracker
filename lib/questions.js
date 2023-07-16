const inquirer = require("inquirer");
const { selectDepartments, selectRoles, selectEmployees, selectManagers } = require("./queries");

const mainMenuQuestions = {
  type: "list",
  name: "query",
  message: "Select an option",
  choices: [
    "View all employees",
    "Add an employee",
    "Update Employee Role",
    "Update Employee Manager",
    "View all roles",
    "Add a role",
    "View all departments",
    "Add a department",
    "Exit",
  ],
};

const addRoleQuestions = [
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
    choices: selectDepartments,
  },
];

const addEmpQuestions = [
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
];

const addEmpRoleQuestions = [
  {
    type: "list",
    name: "id",
    message: "Which employee's role would you like to update?",
    choices: selectEmployees,
  },
  {
    type: "list",
    name: "role_id",
    message: "What is the employee's new role?",
    choices: selectRoles,
  },
];

const addDepartmentQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the name of the department you would like to add?",
  },
];

const addEmpManagerQuestions = [
  {
    type: "list",
    name: "id",
    message: "Which employee's manager would you like to update?",
    choices: selectEmployees,
  },
  {
    type: "list",
    name: "manager_id",
    message: "Who is the employee's new manager?",
    choices: selectManagers,
  },
];

module.exports = {
  mainMenuQuestions,
  addRoleQuestions,
  addEmpQuestions,
  addEmpRoleQuestions,
  addDepartmentQuestions,
  addEmpManagerQuestions,
};
