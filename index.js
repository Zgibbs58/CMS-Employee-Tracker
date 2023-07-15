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
        handleView("employees");
        break;

      case "View all roles":
        viewRoles();
        break;

      case "View all departments":
        handleView("departments");
        break;

      case "Add an employee":
        selectRoles().then((roles) => {
          selectManagers().then((managers) => {
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
                choices: roles,
              },
              {
                type: "list",
                name: "manager_id",
                message: "Who is the employee's manager?",
                choices: managers,
              },
            ]).then(addEmployee);
          });
        });
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
