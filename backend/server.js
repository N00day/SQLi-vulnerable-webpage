const express = require('express');
const db = require('./db');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, './frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/index.html'));
});

app.post('/login', (req, res) => {

  var userName = req.body.username;
  var passWord = parseInt(req.body.password);

  const isUserValid = /^[a-zA-Z0-9]+$/.test(userName);
  const isPassValid = /^\d+$/.test(passWord);

  if(!isUserValid || !isPassValid){

    return res.send('<h1>Invalid input</h1><p>Only alphanumeric usernames and numeric passwords are allowed.</p>');

  }

  // const query = `SELECT * FROM users WHERE name = '${userName}' AND password = '${passWord}'`;

  const query = `SELECT * FROM users WHERE name = ? AND password = ?`;

  db.query(query, [userName, passWord], (err, result) => {

    let message;

    if (err) {
      message = `Database error: ${err.message}`;
    } else if (result.length > 0) {
      message = `<h1>Welcome '${result[0].name}'</h1>`;
    } else {
      message = 'User not found!';
    }
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Login Response</title>
        <style>
          body, html {
            margin: 0;
            height: 100%;
            font-family: Arial, sans-serif;
          }
          body {
            background-image: url('/bg.png');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
          }
          .container {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .message-box {
            background: white;
            padding: 30px 40px;
            border-radius: 12px;
            box-shadow: 0 0 15px rgba(0,0,0,0.25);
            min-width: 320px;
            text-align: center;
            font-size: 1.2rem;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="message-box">${message}</div>
        </div>
      </body>
      </html>
    `);
  })
})

app.listen(3000, () => {
  console.log(`server is running at http://localhost:${PORT}`);

});