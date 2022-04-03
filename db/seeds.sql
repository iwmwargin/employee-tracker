INSERT INTO department (name)
VALUES 
    ('FOH'),
    ('BOH'),
    ('Accounting'),
    ('Management');

INSERT INTO role (title, salary, department_id)
VALUES 
    ('Chef', 75000, 4),
    ('General Manager', 75000, 4),
    ('Sous Chef', 50000, 2),
    ('Waitstaff', 35000, 1),
    ('Accountant', 60000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('Fred', 'Lankston', 1, null),
    ('Tref', 'Binkser', 3, 1),
    ('Milo', 'Billington', 3, 1),
    ('Kip', 'Stevens', 2, null), 
    ('Matt', 'Matthews', 2, 4), 
    ('Jasper', 'Rajendren', 4, null),
    ('Cappo', 'Scrams', 4, 6),
    ('Jenny', 'Crub', 5, null),
    ('Willow', 'Plad', 5, 8);