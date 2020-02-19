const jwt = require('jsonwebtoken');
const users = require('./../database/users');
const fs = require('fs');
const path = require('path');
module.exports = {
  // add User
  addUser (req, res) {
    const illegalChars = /\W/; //only numbers and alphabets
    // validate username
    if (!req.query.username || req.query.username === '') {
      res.send('username empty');
      return;
    }
    if (illegalChars.test(req.query.username)) {
      res.send('Please enter valid Username. Use only numbers and alphabets');
      return;
    }
    if (!req.query.password || req.query.password === '') {
      res.send('password empty')
      return;
    }
    if (illegalChars.test(req.query.password)) {
      res.send('Please enter valid password. Use only numbers and alphabets');
      return;
    }
    let userAlreadyExists = users.filter((row) => row.username === req.query.username )
    userAlreadyExists = userAlreadyExists[0];
    if (userAlreadyExists) {
      res.send('user already exists');
    } else {
      let newUsers = [...users,
          {
            id: users.length + 1,
            username: req.query.username,
            password: req.query.password
          }
        ];
      fs.writeFile(path.join(__dirname, './../database/users.json'), JSON.stringify(newUsers), (err) => {
        if(err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      })
      res.send('user added');
    }


  }

  // delete user

  // changeUser

  // getUser
};
