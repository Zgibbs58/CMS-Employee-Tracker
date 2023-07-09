const inquirer = require("inquirer");
const prompt = inquirer.createPromptModule();

const questions = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "action",
    choices: [
      { name: "View All Employees", value: "allEmployees" },
      { name: "Add Employee", value: "addEmployee" },
      { name: "Update Employee Role", value: "updateRole" },
      { name: "View All Roles", value: "allRoles" },
      { name: "Add Role", value: "addRole" },
      { name: "View All Departments", value: "allDepartments" },
      { name: "Add Department", value: "addDepartment" },
    ],
  },
  {
    type: "input",
    message: "What is the employee's first name?",
    name: "firstName",
    when: (answers) => answers.action === "addEmployee",
  },
  {
    type: "input",
    message: "What is the employee's last name?",
    name: "lastName",
    when: (answers) => answers.action === "addEmployee",
  },
  {
    type: "list",
    message: "What is the employee's role?",
    name: "role",
    choices: [
      { name: "Sales Lead", value: "Sales Lead" },
      { name: "Salesperson", value: "Salesperson" },
      { name: "Lead Engineer", value: "Lead Engineer" },
      { name: "Software Engineer", value: "Software Engineer" },
      { name: "Account Manager", value: "Account Manager" },
      { name: "Accountant", value: "Accountant" },
      { name: "Legal Team Lead", value: "Legal Team Lead" },
      { name: "Lawyer", value: "Lawyer" },
    ],
    when: (answers) => answers.action === "addEmployee",
  },
  {
    type: "list",
    message: "Who is the employee's manager?",
    name: "manager",
    choices: [
      { name: "John Doe", value: "John Doe" },
      { name: "Mike Chan", value: "Mike Chan" },
      { name: "Ashley Rodriguez", value: "Ashley Rodriguez" },
      { name: "Kevin Tupik", value: "Kevin Tupik" },
      { name: "Malia Brown", value: "Malia Brown" },
      { name: "Sarah Lourd", value: "Sarah Lourd" },
      { name: "Tom Allen", value: "Tom Allen" },
    ],
    when: (answers) => answers.action === "addEmployee",
  },
  {
    type: "input",
    message: "What is the role's title?",
    name: "title",
    when: (answers) => answers.action === "addRole",
  },
  {
    type: "input",
    message: "What is the role's salary?",
    name: "salary",
    when: (answers) => answers.action === "addRole",
  },
  {
    type: "list",
    message: "What is the role's department?",
    name: "department",
    choices: [
      { name: "Sales", value: "Sales" },
      { name: "Engineering", value: "Engineering" },
      { name: "Finance", value: "Finance" },
      { name: "Legal", value: "Legal" },
    ],
    when: (answers) => answers.action === "addRole",
  },
  {
    type: "input",
    message: "What is the department's name?",
    name: "name",
    when: (answers) => answers.action === "addDepartment",
  },
];

function startCMS() {
  prompt(questions).then((answers) => {
    console.log(answers);
    startCMS();
  });
}

startCMS();
