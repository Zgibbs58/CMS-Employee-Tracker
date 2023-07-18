# Employee Tracker System (CMS)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This command-line application allows you to manage a company's employee database. It provides functionalities to view departments, roles, and employees, as well as add new departments, roles, and employees. You can also update an employee's role.

# Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Video Walkthrough](#video-walkthrough)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Installation

To use this application, please follow these steps:

1. Clone the repository to your local machine.
2. Install the necessary dependencies by running the command: npm install.
3. Set up your MySQL database and update the connection configuration in the connection.js file.
4. Import the database schema provided in the schema.sql file to create the required tables.
5. Run the application by running the command: node index.js.

## Usage

Upon running the application, you will be presented with a menu of options. Use the arrow keys to navigate through the options and press Enter to select an option. Follow the prompts to perform various actions such as viewing departments, roles, and employees, adding departments, roles, and employees, and updating employee roles.

## Features

View all departments: Displays a formatted table of department names and IDs.
View all roles: Displays a formatted table of job titles, role IDs, departments, and salaries.
View all employees: Displays a formatted table of employee data, including IDs, names, job titles, departments, salaries, and managers.
Add a department: Prompts you to enter the name of a new department and adds it to the database.
Add a role: Prompts you to enter the name, salary, and department of a new role and adds it to the database.
Add an employee: Prompts you to enter the first name, last name, role, and manager of a new employee and adds them to the database.
Update an employee role: Prompts you to select an employee and update their role in the database.

## Video Walkthrough

[Link to Walkthrough Video](https://drive.google.com/file/d/1Z8fVnCrX_5llcG51-8T2rW0sQsbl_xRi/view)

![Walkthrough GIF](assets/media/walkthroughGif.gif)

## Dependencies

This application uses the following dependencies:

mysql2: Used to connect to the MySQL database and perform queries.
inquirer: Used to interact with the user via the command line.

## Contributing

Contributions to this project are welcome! If you have any suggestions, please create an issue or submit a pull request.

## License

This project is licensed under the MIT License.

--- 
