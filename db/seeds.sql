INSERT INTO role
  (title, salary, department_id)
VALUES
  ('BIG BOSS', 14.25, 1),
  ('small boss', 14.24, 1),
  ('Boss of Themselves', 14.23, 2);


INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, 1),
  ('Virginia', 'Woolf', 1, 1),
  ('Piers', 'Gaveston', 1, 1),
  ('Charles', 'LeRoi', 2, 1),
  ('Katherine', 'Mansfield', 2, 1),
  ('Dora', 'Carrington', 3, 1),
  ('Edward', 'Bellamy', 3, 1),
  ('Montague', 'Summers', 3, 1),
  ('Octavia', 'Butler', 3, 1),
  ('Unica', 'Zurn', 2, 1);