const db = require("./db/connection");
const cTable = require("console.table");
const inquirer = require("inquirer");

// Start server after DB connection
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  introTitle();
});

const introTitle = () => {
  console.log("");
  console.log("*******************************");
  console.log("        Employee Tracker        ");
  console.log("            For You             ");
  console.log("");
  console.log("*******************************");
  promptQuestion();
};

//The question that starts it off and serves as the hub
const promptQuestion = () => {
  inquirer
    .prompt({
      type: "list",
      message: "Do something.",
      name: "choice",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update Employee Role",
        "All Done",
      ],
    })
    .then((answer) => {
      if (answer.choice === "View All Departments") {
        viewAllDepartments();
      } else if (answer.choice === "View All Roles") {
        viewAllRoles();
      } else if (answer.choice === "View All Employees") {
        viewAllEmployees();
      } else if (answer.choice === "Add a Department") {
        AddDepartment();
      } else if (answer.choice === "Add a Role") {
        AddRole();
      } else if (answer.choice === "Add an Employee") {
        AddEmployee();
      } else if (answer.choice === "Update Employee Role") {
        updateEmployeeRole();
      } else if (answer.choice === "All Done") {
        console.log("You did it!!!");
        process.exit();
      }
    });
};

//Peek at all the Departments
const viewAllDepartments = () => {
  console.log("");
  console.log("*******************************");
  console.log("       All Departments         ");
  console.log("");
  console.log("*******************************");

  const sql = `SELECT department.id, department.name AS department_names FROM department`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.table(rows);

    promptQuestion();
  });
};

//Peek at all the Roles
const viewAllRoles = () => {
  console.log("");
  console.log("*******************************");
  console.log("          All Roles            ");
  console.log("");
  console.log("*******************************");

  const sql = `SELECT role.title AS job_title,
                role.id,
                department.name AS department,
                role.salary
                FROM role
                LEFT JOIN department ON role.department_id = department.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.table(rows);

    promptQuestion();
  });
};

//Peek at all the Departments
const viewAllEmployees = () => {
  console.log("");
  console.log("*******************************");
  console.log("         All Employees         ");
  console.log("");
  console.log("*******************************");

  const sql = `SELECT employee.id,
                employee.first_name,
                employee.last_name,
                role.title AS job_title,
                department.name AS department,
                role.salary,
                CONCAT (manager.first_name, " ", manager.last_name) AS manager
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.table(rows);

    promptQuestion();
  });
};

//Add a Department
const AddDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the new department? (Required)",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the Department's Name!");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO department (name)
      VALUES (?)`;

      db.query(sql, answer.name, (err, result) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        viewAllDepartments();
      });
    });
};

//Add a Role
const AddRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the new Role? (Required)",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the Role's Name!");
            return false;
          }
        },
      },
      {
        type: "number",
        name: "salary",
        message: "What is the New Role's salary? (Required)",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log(
              " is not a number.  Please enter the salary!  Press up then down to clear NaN error message and try again."
            );
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      // get from the department table
      const params = [answer.name, answer.salary];

      const deptInfo = `SELECT name, id FROM department`;

      db.query(deptInfo, (err, data) => {
        if (err) throw err;

        const dept = data.map(({ name, id }) => ({ name: name, value: id }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "dept",
              message: "What Department is this Role in?",
              choices: dept,
            },
          ])
          .then((deptChoice) => {
            const dept = deptChoice.dept;
            params.push(dept);

            const sql = `INSERT INTO role (title, salary, department_id)
            VALUES (?,?,?)`;

            db.query(sql, params, (err, result) => {
              if (err) {
                res.status(400).json({ error: err.message });
                return;
              }
              viewAllRoles();
            });
          });
      });
    });
};

//Add an Employee
const AddEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the first name of the new Employee? (Required)",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the Employee's first name!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the last name of the new Employee? (Required)",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the Employee's last name!");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      //get from the role table
      const params = [answer.firstName, answer.lastName];

      const roleInfo = `SELECT title, id FROM role`;

      db.query(roleInfo, (err, data) => {
        if (err) throw err;

        const role = data.map(({ title, id }) => ({ name: title, value: id }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "role",
              message: "What Role does this Employee perform?",
              choices: role,
            },
          ])
          .then((roleChoice) => {
            const role = roleChoice.role;
            params.push(role);

            //get manager from employee table
            const managerInfo = `SELECT * FROM employee`;

            db.query(managerInfo, (err, data) => {
              if (err) throw err;

              const managerList = data.map(({ first_name, last_name, id }) => ({
                name: first_name + " " + last_name,
                value: id,
              }));

              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "manager",
                    message: "Who is this Employee Manager?",
                    choices: managerList,
                  },
                ])
                .then((managerChoice) => {
                  const manager = managerChoice.manager;
                  params.push(manager);

                  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES (?,?,?,?)`;

                  db.query(sql, params, (err, result) => {
                    if (err) {
                      res.status(400).json({ error: err.message });
                      return;
                    }
                    viewAllEmployees();
                  });
                });
            });
          });
      });
    });
};

//Updates an employees role
const updateEmployeeRole = () => {
  const employeeInfo = `SELECT * FROM employee`;

  db.query(employeeInfo, (err, data) => {
    if (err) throw err;

    const employeeList = data.map(({ first_name, last_name, id }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "name",
          message: "Please select an Employee.",
          choices: employeeList,
        },
      ])
      .then((employeeChoice) => {
        const employee = employeeChoice.name;
        const params = [employee];

        const roleInfo = `SELECT title, id FROM role`;

        db.query(roleInfo, (err, data) => {
          if (err) throw err;

          const role = data.map(({ title, id }) => ({
            name: title,
            value: id,
          }));

          inquirer
            .prompt([
              {
                type: "list",
                name: "role",
                message: "Select new Role.",
                choices: role,
              },
            ])
            .then((roleChoice) => {
              const role = roleChoice.role;
              params.push(role);

              params.reverse();

              const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
              db.query(sql, params, (err, reult) => {
                if (err) throw err;

                viewAllEmployees();
              });
            });
        });
      });
  });
};
