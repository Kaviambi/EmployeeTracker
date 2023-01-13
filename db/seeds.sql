/* database */
INSERT INTO department(dept_name)
VALUES ("engineering"), 
("finance"),
("legal"),
("sales");

INSERT INTO employee_role (title, salary, department_id)
VALUES ("Sales Lead", 100000,4),
("Sales Person", 70000,4),
("Lead engineering", 90000,1),
("Software Engineering", 100000,1),
("Lawyer", 2000,3),
("Account Manager", 500000,2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("April", "Neil", 1, 3),
("Dani", "Gary", 2, 1),
("Jess", "Gonzalues", 3, NULL),
("Ravi", "Jones", 4, 2),
("Siva", "Mathews", 5, 3),
("Kevin", "Chris", 6, 4);
