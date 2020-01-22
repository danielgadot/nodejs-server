const express = require('express');
const app = express();
const routes = require('./routes')(app)
const port = 3000
const path = require('path');
const bodyParser = require('body-parser');
const commander = require('commander');
const inquirer = require('inquirer');
const database = require('./products.json');
const data = require('./database/audusd-d1.json');
const verifyToken = require('./verify-token');
const MongoClient = require('mongodb').MongoClient;
const cookieParser = require('cookie-parser');
const usersDb = require('./database/users');
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true});

// let mongoClient = new MongoClient(new Server('localhost', 27017),{ native_parser: true } );
MongoClient.connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err, client) {

    if(err) throw err;
    const db = client.db('daniel');
    const collection = db.collection('main');
    collection.find({username: 'daniel'}).toArray((err, items) => {
        console.log(items)
    })


});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())

// app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../client/index.html')))
// app.use('/', express.static(path.join(__dirname, '../client')));
app.get('/',(req, res) => {
    res.cookie('name-key', 'daniel-value');
    res.send('<h1>get route</h1>');
});

function addHeaders(req, res, next) {
    
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    // Pass to next layer of middleware
    next();
}


app.listen(port, () => console.log(`Example app listening on port ${port}!`))





