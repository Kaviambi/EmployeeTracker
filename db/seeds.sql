/* database */
INSERT INTO department(dept_name)
VALUES ("engineering"), 
("finance"),
("legal"),
("sales");

INSERT INTO employee_role (title, salary, department_id)
VALUES ("Sales Lead", 100000,1),
("Sales Person", 70000,2),
("Lead engineering", 90000,3),
("Software Engineering", 100000,4),
("Lawyer", 2000,2),
("Account Manager", 500000,1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("April", "Neil", 5, 1),
("Dani", "Gary", 6, 2),
("Jess", "Gonzalues", 1, 3),
("Ravi", "Jones", 3, 4),
("Siva", "Mathews", 4, NULL),
("Kevin", "Chris", 1, 6);