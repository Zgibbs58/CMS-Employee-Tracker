USE employee_db;

INSERT INTO department (name)
VALUES ('Sales'), ('Engineering'), ('Finance'), ('Legal');

INSERT INTO
    role (title, salary, department_id)
VALUES ('Sales', 80000, 1), ('Sales Lead', 100000, 1), ('Engineering', 100000, 2), ('Engineer Lead', 150000, 2), ('Accountant', 90000, 3), (
        'Accountant Manager',
        130000,
        3
    ), ('Lawyer', 150000, 4), ('Legal Team Lead', 20000, 4);

INSERT INTO
    employee (
        first_name,
        last_name,
        role_id,
        manager_id
    )
VALUES ('John', 'Doe', 2, null), ('Mike', 'Chan', 1, null), ('Ashley', 'Stacy', 8, null), ('Kevin', 'Tupik', 5, null), ('Malia', 'Brown', 4, null), ('Sarah', 'Lourd', 6, null), ('Tom', 'Allen', 7, null);