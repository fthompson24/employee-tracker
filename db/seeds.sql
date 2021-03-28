USE employees_db;

INSERT INTO department (name)
VALUES 
("Sales"),
("Legal"),
("Finance"),
("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES 
("Senior Sales Rep", 95000, 1),
("Sales Rep", 60000, 1),
("Senior Engineer", 90000, 4),
("Quality Engineer", 70000, 4),
("Lawyer", 120000, 2),
("Legal Assistant", 60000, 2),
("Finance Manager", 90000, 3);


INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES 
("Eric", "Cartman", null, 1),
("Bebe", "Stevens", 1, 2),
("Randy", "Marsh", null, 3),
("Sheila", "Braflovski", 3, 4),
("Butters", "Stoch", null, 5),
("Wendy", "Testaburger", 2, 6),
("Timmy", "Burch", null, 7);
