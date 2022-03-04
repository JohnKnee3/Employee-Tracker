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
      choices: ["View All Departments", "All Done"],
    })
    .then((answer) => {
      if (answer.choice === "View All Departments") {
        viewAllDepartments();
      } else if (answer.choice === "All Done") {
        console.log("You did it!!!");
        process.exit();
      }
    });
};

const viewAllDepartments = () => {
  console.log("");
  console.log("*******************************");
  console.log("Welcome to the department land.");
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
