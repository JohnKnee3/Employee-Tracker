mysql -u root -p

SHOW DATABASES; shows a dbs
USE election; this is how you select one
SHOW TABLES; shows a list of all tables

SELECT \* FROM candidates; displays all the seeds
SELECT first_name, last_name FROM candidates; displays just these selected seeds.
DESCRIBE candidates; shows all the column names

ALTER TABLE candidates ADD COLUMN party_id INTEGER; adds a column named party id to the selected table.
DROP TABLE IF EXISTS parties;

source db/db.sql
source db/schema.sql
source db/seeds.sql
/
/
/
12.1.4 Got SQL set up. Made our first database with CREATE DATABASE election;, then selected it with USE election; and then added a table to it table with CREATETABLE();. Typed DESCRIBE candidates to view the table. --mysql -u root -p-- opens up the ability to use SQL.
/
/
/
12.1.5 Learned how to add data to a table using
INSERT INTO candidates (first_name, last_name, industry_connected)
VALUES
('Virginia', 'Woolf', 1),
('Piers', 'Gaveston', 0);
Then we learned how to view the entire table using SELECT \* canadidates;
Then we learned how SELECT specific things in the table by
SELECT first_name, last_name FROM candidates;
Finally we learned how to parse the data using WHERE
SELECT first_name
FROM candidates
WHERE industry_connected = 1;
Which will show the first name of everyone apart of the industry_connected.
/
/
/

## 12.1.6

We learned how to set up files in JS to perform the SQL bits for us. First we created db.sql in the db folder to handle the creation of the databse named election.

DROP DATABASE IF EXISTS election;
CREATE DATABASE election;
USE election;
We first drop it if it exists and create a new one most likely so we can handle updates without any fuss. We also then had to route to it using mysql> source db/db.sql.

Then we added the bit that creates the table in the shema.sql and routed to it with mysql> source db/schema.sql. The file looked like this.
CREATE TABLE candidates (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
industry_connected BOOLEAN NOT NULL
);

## Finally we added the seeds.sql file to populate the table and routed to it with mysql> source db/seeds.sql. The file looked like this when done.

INSERT INTO candidates (first_name, last_name, industry_connected)
VALUES
('Ronald', 'Firbank', 1),
('Virginia', 'Woolf', 1),
('Piers', 'Gaveston', 0),
('Charles', 'LeRoi', 1),
('Katherine', 'Mansfield', 1),
('Dora', 'Carrington', 0),
('Edward', 'Bellamy', 0),
('Montague', 'Summers', 1),
('Octavia', 'Butler', 1),
('Unica', 'Zurn', 1);
--.

## After that we learned the syntax to update specific columns and rows with this syntax

UPDATE candidates
SET industry_connected = 1
WHERE id = 3;
--.

## and delete entire rows with this syntax

DELETE FROM candidates
WHERE first_name = "Montague";
Then they scolded us for deleting by name and not ID.
--.
/
/
/

## 12.2.3

A fair amount of setup for express, jest, sql and npm. I will have to refer to this to get the project set up.
/
/
/

## 12.2.4

Set up mulitple db.query's in the server.js that all ran by just hitting npm start. We used --db.query(`SELECT * FROM candidates`, (err, rows) => {-- to show the entire table and then used --db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {-- to just show the first row. We then used -- db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {-- to delete the first row and finally used --const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) VALUES (?,?,?,?)`;
const params = [1, "Ronald", "Firbank", 1];

db.query(sql, params, (err, result) => {-- to add that same person back into the condidates table.
/
/
/

## 12.2.5

## Showed how to set up express.js to talk to our SQL db table canddiates. We used a get to grab the entire table

app.get("/api/candidates", (req, res) => {
const sql = `SELECT * FROM candidates`;

db.query(sql, (err, rows) => {
--.

## and another get to grab a specific row by id

app.get("/api/candidate/:id", (req, res) => {
const sql = `SELECT * FROM candidates WHERE id = ?`;
const params = [req.params.id];

db.query(sql, params, (err, row) => {
--.
/
/
/

## 12.2.6

## Showed how to use express.js to talk to our SQL db table candidates again. This time we used app.delete to target a row by it's id and delete it from the table.

app.delete("/api/candidate/:id", (req, res) => {
const sql = `DELETE FROM candidates WHERE id = ?`;
const params = [req.params.id];

db.query(sql, params, (err, result) => {
if (err) {
res.statusMessage(400).json({ error: res.message });
} else if (!result.affectedRows) {
res.json({
message: "Candidate not found",
});
} else {
res.json({
message: "deleted",
changes: result.affectedRows,
id: req.params.id,
});
}
});
});
--.
It's worth showing this entire thing because of the else if statement that checks to see if what you are trying to delete exists. If so it warns you and doesn't let you do it.
/
/
/

## 12.2.7

Showed how to use express.js to talk to our SQL db table candidates again. This we used app.post to add a row to the exsisting candidates table. The generate ID is handeled by the id INTEGER AUTO_INCREMENT in the shema.js.

## Here is a look at the entire code block we added.

app.post("/api/candidate", ({ body }, res) => {
const errors = inputCheck(
body,
"first_name",
"last_name",
"industry_connected"
);
if (errors) {
res.status(400).json({ error: errors });
return;
}
const sql = `INSERT INTO candidates (first_name, last_name, industry_connected) VALUES (?,?,?)`;
const params = [body.first_name, body.last_name, body.industry_connected];

db.query(sql, params, (err, result) => {
if (err) {
res.status(400).json({ error: err.message });
return;
}
res.json({
message: "success",
data: body,
});
});
});
--.
The main thing to note is we are using a module provided function to check if the input fields are correct. Everything else works as expected.
/
/
/

## 12.3.3

We added a new table to the seeds.sql named parties. We ran all this in the terminal. Basically you can just run the file that is being updated. So if you update schema.sql, after you save go into the terminal and type --source db/schema.sql-- and it will update SQL based on the file. Same applies to seeds.sql just use --source db/seeds.sql-- to update what gets populated. It is worth noting that running the seeds over and over again will add duplicate info. To reset just run all three pages in order to clear it out.
/
/
/

## 12.3.4

We learned how to link to different tables together. First we modified the candidates table to ensure it has a party_id line. Then we added the constraint line so that it will take this newly created party_id and send it into the parties table to find it's matching id over there.

## The code looks like this.

CREATE TABLE candidates (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
party_id INTEGER,
industry_connected BOOLEAN NOT NULL,
CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL
);
--.
We then updated the seeds to match the new requirements for the candidates table. Also any linked table must come before(above) the main table that is referencing it and when you drop tables the reverse it true.
/
/
/

## 12.3.5

Used express.js to work with the sql to get the linked tables. We had to modify the sql vars for both gets to accommodate this new table.

## We changed the get all sql var to look like this.

app.get("/api/candidates", (req, res) => {
const sql = `SELECT candidates.*, parties.name AS party_name FROM candidates LEFT JOIN parties ON candidates.party_id = parties.id`;
--.
This basically says we are getting all info from the candidates table. Then we are only grabbing the name from the parties table where FROM candidates is referencing the root table. Then we bring in the parties table and target it's id by grabbing party_id from the candidates table.

## Finally for the get by id we just add 1 more line like this.

app.get("/api/candidate/:id", (req, res) => {
const sql = `SELECT candidates.*, parties.name AS party_name FROM candidates LEFT JOIN parties ON candidates.party_id = parties.id WHERE candidates.id = ?`;
--.
To make sure it looks at the passed in candidates entire id for the search so we don't just grab every candidate.
/
/
/

## 12.3.6

Added a get all parties and get by id parties and delete by id parties. This code is identical to how we handled the candidates table before we linked it to the parties table.

## Get all parties

app.get("/api/parties", (req, res) => {
const sql = `SELECT * FROM parties`;
--.

## Get party by id

app.get("/api/party/:id", (req, res) => {
const sql = `SELECT * FROM parties WHERE id = ?`;
const params = [req.params.id];
--.

## Delete party by id

app.delete("/api/party/:id", (req, res) => {
const sql = `DELETE FROM parties WHERE id = ?`;
const params = [req.params.id];
--.
/
/
/

## 12.3.7

Created a put for party_id in the candidates table. This allows us to update the candidates party. put = edit.

## Code for the put

app.put("/api/candidate/:id", (req, res) => {
const errors = inputCheck(req.body, "party_id");

if (errors) {
res.status(400).json({ error: errors });
return;
}

const sql = `UPDATE candidates SET party_id = ? WHERE id = ?`;
const params = [req.body.party_id, req.params.id];
db.query(sql, params, (err, result) => {
if (err) {
res.status(400).json({ error: err.message });
// check if a record was found
} else if (!result.affectedRows) {
res.json({
message: "Candidate not found",
});
} else {
res.json({
message: "success",
data: req.body,
changes: result.affectedRows,
});
}
});
});
--.

This code is a bit more involved. But we create a check that tests if you selected a valid party id.

Then the next two lines are the Update which lays the ground work SET making sure the first value is the party_id from the body of what is being sent in at the location of the param from the URL that zeroes in on the candidates table row.

Then in the params var we make sure to call it correctly with req.body.part_id being the new id sent in and the req.params.id being the candidate being targeted by the URL.

SELECT \* FROM items
LEFT JOIN categories ON items.category_id = categories.id;
Was the simple way to join to tables from the quiz.
/
/
/

## 12.4.3

Set up the voters table in the schema.sql and gave it this

## new time stamp feature.

CREATE TABLE voters (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
email VARCHAR(50) NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
--.
then we seeded 50 voters in seeds.sql.
/
/
/

## 12.4.4

Moved the connection to sql in the db folder named connection.js and simply added an export to the bottom and the sql require up top. In server.js we required it up top with ./db/connnection.

## SQL start file

const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection({
host: "localhost",
// Your MySQL username,
user: "root",
// Your MySQL password
password: "1Limli2tst9!9pd",
database: "election",
});

module.exports = db;
--.
Then we created a routes folder and made an index.js that is designed to talk to the other files in this folder.

## index.js

const express = require("express");
const router = express.Router();

router.use(require("./candidateRoutes"));
router.use(require("./partyRoutes"));

module.exports = router;
--.
In the server.js we added apiRoutes require variable which target the folder but by default will target the index.js.

## We also added

app.use("/api", apiRoutes);
--.
To add /api to all all future routes that will be uesed by this app.use

Then we added the candidateRoutes.js to the routes folder. Up top we required express followed by the router var which uses express. Then we required db and folder up a bit to find the new connection folder and also added that inputCheck function the module provided. Then in server.js we pulled out all of the app.get, .posts etc... that relate to the candidates and moved them into here. We had to change app to router and remove /api since server.js is already applying it . At the bottom we exported it using export.module.

## candidatesRoutes.js code

const express = require("express");
const router = express.Router();
const db = require("../../db/connection");
const inputCheck = require("../../utils/inputCheck");

// Get all candidates and their party affiliation
router.get("/candidates", (req, res) => {
const sql = `SELECT candidates.*, parties.name AS party_name FROM candidates LEFT JOIN parties ON candidates.party_id = parties.id`;

db.query(sql, (err, rows) => {
if (err) {
res.status(500).json({ error: err.message });
return;
}
res.json({
message: "success",
data: rows,
});
});
});

// Get single candidate with party affiliation
router.get("/candidate/:id", (req, res) => {
const sql = `SELECT candidates.*, parties.name AS party_name FROM candidates LEFT JOIN parties ON candidates.party_id = parties.id WHERE candidates.id = ?`;
const params = [req.params.id];

db.query(sql, params, (err, row) => {
if (err) {
res.status(400).json({ error: err.message });
return;
}
res.json({
message: "success",
data: row,
});
});
});

// Create a candidate
router.post("/candidate", ({ body }, res) => {
// Candidate is allowed not to be affiliated with a party
const errors = inputCheck(
body,
"first_name",
"last_name",
"industry_connected"
);
if (errors) {
res.status(400).json({ error: errors });
return;
}

const sql = `INSERT INTO candidates (first_name, last_name, industry_connected, party_id) VALUES (?,?,?,?)`;
const params = [
body.first_name,
body.last_name,
body.industry_connected,
body.party_id,
];

db.query(sql, params, (err, result) => {
if (err) {
res.status(400).json({ error: err.message });
return;
}
res.json({
message: "success",
data: body,
changes: result.affectedRows,
});
});
});

// Update a candidate's party
router.put("/candidate/:id", (req, res) => {
// Candidate is allowed to not have party affiliation
const errors = inputCheck(req.body, "party_id");
if (errors) {
res.status(400).json({ error: errors });
return;
}

const sql = `UPDATE candidates SET party_id = ? WHERE id = ?`;
const params = [req.body.party_id, req.params.id];
db.query(sql, params, (err, result) => {
if (err) {
res.status(400).json({ error: err.message });
// check if a record was found
} else if (!result.affectedRows) {
res.json({
message: "Candidate not found",
});
} else {
res.json({
message: "success",
data: req.body,
changes: result.affectedRows,
});
}
});
});

// Delete a candidate
router.delete("/candidate/:id", (req, res) => {
const sql = `DELETE FROM candidates WHERE id = ?`;
const params = [req.params.id];
db.query(sql, params, (err, result) => {
if (err) {
res.statusMessage(400).json({ error: res.message });
} else if (!result.affectedRows) {
res.json({
message: "Candidate not found",
});
} else {
res.json({
message: "deleted",
changes: result.affectedRows,
id: req.params.id,
});
}
});
});

module.exports = router;
--.
Then we literally did the exact same thing to parties. In index.js we made sure to add router.use(require("./fileNameHere")); seeing as how server.js talks to index.js first. Index.js serves as the first stop to route server.js to the correct routes file.
/
/
/

## 12.4.5

Simply added the get all and the get by ID for voters. The big change here was they introduced ORDER BY which is added just after the FROM voters line when creating the sql variable that gets passed in.

## ORDER BY example

const sql = `SELECT * FROM voters ORDER BY last_name`;--

You can also slap a DESC at the end of it if you wanted to change the order from A-Z to Z-A.
/
/
/

## 12.4.6

Added the post, put and delete for the page. Nothing really new here. In fact I was able to do this one entirely by copy and pasting candidates over and modifying the names. Look at the code added in 12.4.4 if unsure.
/
/
/

## 12.5.3

We created a votes table. Then we were introduced to 2 constraints that used a fk with ON DELETE CASCADE. Essentially what this means is that if you delete the voter or the candidate from their respective table they will also delete in the votes table.

## The CASCADE syntax looks like this

CREATE TABLE votes (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
voter_id INTEGER NOT NULL,
candidate_id INTEGER NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT uc_voter UNIQUE (voter_id),
CONSTRAINT fk_voter FOREIGN KEY (voter_id) REFERENCES voters(id) ON DELETE CASCADE,
CONSTRAINT fk_candidate FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);
--.

## They were also careful to make sure to drop things in this order

DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS candidates;
DROP TABLE IF EXISTS parties;
DROP TABLE IF EXISTS voters;
--.
The best I can tell you make sure to drop everything that requires a fk first from bottom to top, Then afterwards you drop everything else in order from top to bottom? This may be wrong.
/
/
/

## 12.5.4

Built the post to add a voter. I again was able to copy and paste the candidatesRoutes.js and by carefully following the steps make it work before the module showed me. No real new info here. But it is worth noting we have not built the router.get so in order to see if it worked I had to go into the MySWL shell USE election;- SELECT \* FROM votes; - to see that it worked after using insomnia to perform my post.
