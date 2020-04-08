

USE employee_db;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('BigDog', 'Shlomo', 1, NULL),
    ('CodeBreaker', 'Younan', 2, NULL),
    ('Pimpin', 'Romero', 3, NULL),
    ('Sensei', 'Manny', 4, 1),
    ('SlackDaddy', 'Armande', 5, NULL),
    ('SportsAgent', 'Mesina', 6, NULL),
    ('NerdGang', 'Amanda', 7, 3),
    ('FantasyLeague', 'Musa', 8, 2);