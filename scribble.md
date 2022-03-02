mysql -u root -p

SHOW DATABASES; shows a dbs
USE election; this is how you select one
SHOW TABLES; shows a list of all tables

SELECT \* FROM candidates; displays all the seeds
SELECT first_name, last_name FROM candidates; displays just these selected seeds.
DESCRIBE candidates; shows all the column names

source db/db.sql
source db/schema.sql
source db/seeds.sql

12.1.4 Got SQL set up. Made our first database with CREATE DATABASE election;, then selected it with USE election; and then added a table to it table with CREATETABLE();. Typed DESCRIBE candidates to view the table. --mysql -u root -p-- opens up the ability to use SQL.

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

12.1.6 We learned how to set up files in JS to perform the SQL bits for us. First we created db.sql in the db folder to handle the creation of the databse named election.

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

Finally we added the seeds.sql file to populate the table and routed to it with mysql> source db/seeds.sql. The file looked like this when done.
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

After that we learned the syntax to update specific columns and rows with this syntax
UPDATE candidates
SET industry_connected = 1
WHERE id = 3;

and delete entire rows with this syntax
DELETE FROM candidates
WHERE first_name = "Montague";
Then they scolded us for deleting by name and not ID.

12.2.3 A fair amount of setup for express, jest, sql and npm. I will have to refer to this to get the project set up.
