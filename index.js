const inquirer = require("inquirer");
const prompt = inquirer.createPromptModule();
require("console.table");
const db = require("./server");

function initialPrompt() {
  prompt({
    type: "list",
    name: "query",
    message: "Select an option",
    choices: ["View all departments", "View all roles", "View all employees", "Add an employee"],
  }).then((answer) => {
    console.log(answer.query);
    if (answer.query === "View all employees") {
      db.query("SELECT * FROM employee", (err, results) => {
        if (err) {
          console.log(err);
        } else {
          console.table(results);
          initialPrompt();
        }
      });
    } else if (answer.query === "View all roles") {
      db.query("SELECT * FROM role", (err, results) => {
        if (err) {
          console.log(err);
        } else {
          console.table(results);
          initialPrompt();
        }
      });
    } else if (answer.query === "View all departments") {
      db.query("SELECT * FROM department", (err, results) => {
        if (err) {
          console.log(err);
        } else {
          console.table(results);
          initialPrompt();
        }
      });
    } else if (answer.query === "Add an employee") {
      employeeRoles().then((roles) => {
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
            name: "role",
            message: "What is the employee's role?",
            choices: roles,
          },
        ]).then((answer) => {
          console.log(answer);
          db.query(
            "INSERT INTO employee SET ?",
            {
              first_name: answer.first_name,
              last_name: answer.last_name,
              role_id: answer.role,
            },
            (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log("Employee added successfully!");
                initialPrompt();
              }
            }
          );
        });
      });
    }
  });
}

function employeeRoles() {
  return db
    .promise()
    .query("SELECT * FROM role")
    .then(([data]) => {
      return data.map(({ title, id }) => ({
        name: title,
        value: id,
      }));
    });
}

initialPrompt();
