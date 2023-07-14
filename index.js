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
        // handleView is a function that takes in a table name, queries the database for that table, and logs the results to the console.
        handleView("employee");
        break;

      case "View all roles":
        handleView("role");
        break;

      case "View all departments":
        handleView("department");
        break;

      case "Add an employee":
        employeeRoles().then((roles) => {
          employeeManager().then((managers) => {
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
              {
                type: "list",
                name: "manager",
                message: "Who is the employee's manager?",
                choices: managers,
              },
            ]).then((answer) => {
              db.query(
                "INSERT INTO employee SET ?",
                {
                  first_name: answer.first_name,
                  last_name: answer.last_name,
                  role_id: answer.role,
                  manager_id: answer.manager,
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
        });
        break;
      case "Add a department":
        addDepartment();
        break;
    }
  });
}

function handleView(table) {
  db.query("SELECT * FROM ??", table, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
      initialPrompt();
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

function employeeManager() {
  return db
    .promise()
    .query("SELECT * FROM employee")
    .then(([data]) => {
      return data.map(({ first_name, last_name, id }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
      }));
    });
}

function addDepartment() {
  prompt([
    {
      type: "input",
      name: "department",
      message: "What is the name of the department you would like to add?",
    },
  ]).then((answer) => {
    db.query(
      "INSERT INTO department SET ?",
      {
        name: answer.department,
      },
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Department added successfully!");
          initialPrompt();
        }
      }
    );
  });
}

initialPrompt();
