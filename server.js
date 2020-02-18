const express = require('express');
const app = express();
const port = 3000
const path = require('path');
const bodyParser = require('body-parser');
const commander = require('commander');
const inquirer = require('inquirer');
const database = require('./products.json');
const data = require('./database/audusd-d1.json');
const MongoClient = require('mongodb').MongoClient;
const cookieParser = require('cookie-parser');
const usersDb = require('./database/users');
var cors = require('cors');
app.use(cors());
app.options('*', cors());
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true});

// let mongoClient = new MongoClient(new Server('localhost', 27017),{ native_parser: true } );
// MongoClient.connect("mongodb://localhost:27017", {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // }, function (err, client) {
        
        //     if(err) throw err;
        //     const db = client.db('daniel');
        //     const collection = db.collection('main');
        //     collection.find({username: 'daniel'}).toArray((err, items) => {
            //         console.log(items)
            //     })
            
            
            // });
            
            
            app.use(bodyParser.urlencoded({ extended: false }));
            app.use(bodyParser.json());
            app.use(cookieParser())
            const routes = require('./routes')(app)

// app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../client/index.html')))
// app.use('/', express.static(path.join(__dirname, '../client')));
app.get('/',(req, res) => {
    res.cookie('name-key', 'daniel-value');
    res.send('<h1>get route</h1>');
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))





