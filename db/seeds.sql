USE employee_db;

INSERT INTO department(name)
VALUES
    ("Sales"),
    ("Legal"),
    ("Finance"),
    ("Engineering");

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
    ("Eric", "Cartman", 1, 1),
    ("Bebe", "Stevens", 2, 1),
    ("Randy", "Marsh", 3, 2),
    ("Sheila", "Braflovski", 4, 2),
    ("Kenny", "McCormick", 5, 3),
    ("Butters", "Stoch", 6, 3),
    ("Wendy", "Testaburger", 7, 4),
    ("Timmy", "Burch", 8, 5);

INSERT INTO role(title, salary, department_id)
VALUES
    ("Sales Rep", 60000, 1),
    ("Senior Engineer", 90000, 2),
    ("Lawyer", 120000, 3),
    ("Senior Sales Rep", 95000, 4),
    ("Finance Cooridator", 60000, 5),
    ("Legal Assistant", 60000, 6),
    ("Quality Engineer", 70000, 7);