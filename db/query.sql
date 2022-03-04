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

                --VIEW ALL DEPARTMENTS
                SELECT department.id, department.name AS Department_Names FROM department;



