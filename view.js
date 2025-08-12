const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('todos.db');

db.all('SELECT * FROM todos', [], (err, rows) => {
  console.log(rows);
  db.close();
});