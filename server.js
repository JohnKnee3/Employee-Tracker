const db = require("./db/connection");
const cTable = require("console.table");
const inquirer = require("inquirer");

// Start server after DB connection
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  promptQuestion();
});

//The question that starts it off and serves as the hub
const promptQuestion = () => {
  inquirer
    .prompt({
      type: "list",
      message: "Do something.",
      name: "choice",
      choices: ["View All Departments", "View All Roles", "All Done"],
    })
    .then((answer) => {
      if (answer.choice === "View All Departments") {
        viewAllDepartments();
      } else if (answer.choice === "View All Roles") {
        viewAllRoles();
      } else if (answer.choice === "All Done") {
        console.log("You did it!!!");
        process.exit();
      }
    });
};

//Has a peek at all the department names
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

//Has a peek at all the department names
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
