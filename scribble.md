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
