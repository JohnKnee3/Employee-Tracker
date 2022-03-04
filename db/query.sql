-- SELECT employee.*, role.title 
--                 AS role 
--                 FROM employee 
--                 LEFT JOIN role 
--                 ON employee.role_id = role.id;

                -- SELECT employee.first_name, employee.last_name, role.title 
                -- AS role  
                -- FROM employee 
                -- LEFT JOIN role 
                -- ON employee.role_id = role.id;

                -- SELECT employee.first_name, 
                --        employee.last_name, 
                --        role.title AS role, 
                --        role.salary  
                -- FROM employee 
                -- LEFT JOIN role 
                -- ON employee.role_id = role.id;

                -- SELECT employee.first_name, 
                --        employee.last_name, 
                --        role.title AS role, 
                --        role.salary, 
                --        department.name AS department  
                -- FROM employee 
                -- LEFT JOIN role ON employee.role_id = role.id
                -- LEFT JOIN department ON role.department_id = department.id;

                
                -- SELECT department.id, department.name AS department_names FROM department;

                -- SELECT role.title AS job_title,
                -- role.id,
                -- department.name AS department,
                -- role.salary
                --  FROM role
                --  LEFT JOIN department ON role.department_id = department.id;

                -- SELECT employee.id,
                -- employee.first_name,
                -- employee.last_name,
                -- role.title AS job_title,
                -- department.name AS department,
                -- role.salary,
                -- CONCAT (manager.first_name, " ", manager.last_name) AS manager
                --  FROM employee
                --     LEFT JOIN role ON employee.role_id = role.id
                --     LEFT JOIN department ON role.department_id = department.id
                --     LEFT JOIN employee manager ON employee.manager_id = manager.id;

                -- INSERT INTO department (name)
                -- VALUES ('The Next Best Thing');

                -- INSERT INTO role (title, salary, department_id)
                -- VALUES ('Mindless Robot', 14.07, 4);

                INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES ('Robo', 'Boto', 5, 1);



