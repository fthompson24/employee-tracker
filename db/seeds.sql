USE employee_db;

INSERT INTO department (dep_name)
VALUES
("Sales"),
("Legal"),
("Finance"),
("Engineering");


INSERT INTO role (title, salary, department_id)
VALUES
("Sales Rep", 60000, 1),
("Senior Engineer", 90000, 4),
("Lawyer", 120000, 2),
("Senior Sales Rep", 95000, 1),
("Accountant", 60000, 3),
("Legal Assistant", 60000, 2),
("Quality Engineer", 70000, 4),
("Finance Controller", 90000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Eric", "Cartman", 1, 4),
("Bebe", "Stevens", 2, null),
("Randy", "Marsh", 3, null),
("Sheila", "Braflovski", 4, null),
("Kenny", "McCormick", 5, 8),
("Butters", "Stoch", 6, 3),
("Wendy", "Testaburger", 7, 2),
("Timmy", "Burch", 8, null);
