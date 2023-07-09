DROP DATABASE IF EXISTS employee_CMS_db;

CREATE DATABASE employee_CMS_db;

USE employee_CMS_db;

CREATE TABLE
    department (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(30) NOT NULL,
        PRIMARY KEY(id)
    );

CREATE TABLE
    role (
        id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(30) NOT NULL,
        salary DECIMAL(10, 2) NOT NULL,
        department_id INT NOT NULL,
        PRIMARY KEY(id)
    )