const mysql = require('mysql');

let connection;

function connectWithRetry() {
  connection = mysql.createConnection({
    host: 'db', 
    user: 'threatActor',
    password: '12345',
    database: 'vulnsi'
  });

  connection.connect((err) => {
    if (err) {
      console.error('MySQL connection failed, retrying in 3s...', err.message);
      setTimeout(connectWithRetry, 3000);
    } else {
      console.log('Connected to MySQL!');
    }
  });
}

connectWithRetry();

module.exports = {
  query: (...args) => connection.query(...args)
};