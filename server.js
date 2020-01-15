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
const apiStats = require('./api/stats');
var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;
const cookieParser = require('cookie-parser');
const usersDb = require('./database/users');

let mongoClient = new MongoClient(new Server('localhost', 27017),{ native_parser: true } );

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())

// const productsRoutes = require('../api/products');

// app.use('/products', vt.verifyToken, productsRoutes);
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

app.use('/stats', addHeaders,verifyToken, apiStats);

app.get('/login',(req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    let foundUser = usersDb.find((user) => user.username === username && user.password === password);
    if (foundUser) {
        res.send({
            message: 'user found',
            data: foundUser
        })
    } else {
        res.send({
            message: 'You typed a wrong password or username',
        })
    }
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {

    // set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};
    //
    // // render the error page
    res.status(err.status || 500);
    res.sendFile(path.join(__dirname, '/views/404.html'))
    // res.render('error');

});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))





