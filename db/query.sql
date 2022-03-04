SELECT employee.*, role.title 
                AS role 
                FROM employee 
                LEFT JOIN role 
                ON employee.role_id = role.id;