-- SELECT employee.*, role.title 
--                 AS role 
--                 FROM employee 
--                 LEFT JOIN role 
--                 ON employee.role_id = role.id;

                SELECT employee.first_name, employee.last_name, role.title 
                AS role  
                FROM employee 
                LEFT JOIN role 
                ON employee.role_id = role.id;

                SELECT employee.first_name, 
                       employee.last_name, 
                       role.title AS role, 
                       role.salary  
                FROM employee 
                LEFT JOIN role 
                ON employee.role_id = role.id;


