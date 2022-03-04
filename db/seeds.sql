INSERT INTO department
  (name)
VALUES
  ('What You Always Wanted'),
  ('Where Dreams Go to Die'),
  ('Somewhere in Between');

INSERT INTO role
  (title, salary, department_id)
VALUES
  ('BIG BOSS', 14.25, 1),
  ('small boss', 14.24, 3),
  ('Lone Wolf', 14.23, 1),
  ('Worker Bee', 14.017, 2);


INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, 1),
  ('Virginia', 'Woolf', 2, 1),
  ('Piers', 'Gaveston', 2, 1),
  ('Charles', 'LeRoi', 3, 1),
  ('Katherine', 'Mansfield', 3, 1),
  ('Dora', 'Carrington', 4, 2),
  ('Edward', 'Bellamy', 4, 2),
  ('Montague', 'Summers', 4, 2),
  ('Octavia', 'Butler', 4, 3),
  ('Unica', 'Zurn', 4, 3);