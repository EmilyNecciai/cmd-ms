INSERT INTO department
  (name)
VALUES
    ('Human Resources'),
    ('Engineering'),
    ('Product'),
    ('Marketing');

INSERT INTO role
  (title, salary, department_id)
VALUES
    ('Lawyer', '250000.00', 1),
    ('Engineer', '130000.00', 2),
    ('SCRUM Master', '100000.00', 2),
    ('Technical Writer', '100000.00', 2),
    ('Product Manager', '120000.00', 3),
    ('Marketing Manager', '90000.00', 4),
    ('Social Media Manager', '80000.00', 4);


INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
    ('Debbie', 'Delorenzo', 1, NULL),
    ('Santos', 'Slifer', 2, NULL),
    ('Dan', 'Dodds', 2, 2),
    ('China', 'Constant', 2, 2),
    ('Reba', 'Rocca', 3, 2),
    ('Vickey', 'Vannatta', 4, 2),
    ('Ramon', 'Rand', 5, NULL),
    ('Melonie', 'Maben', 6, NULL),
    ('Dana', 'Denney', 7, 8),
    ('Jeanmarie', 'Jess', 7, 8);

