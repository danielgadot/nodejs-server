const stats = require('./contorllers/stats.controller');
const controllers = require('./contorllers/controllers');
const verifyToken = require('./verify-token');

// include all controllers

module.exports = function(app) {
    app.get('/stats', verifyToken, controllers.statsCtrl.getStats);
    app.get('/books', verifyToken, controllers.booksCtrl.getBook);
    app.post('/books', verifyToken, controllers.booksCtrl.postBook);
    app.post('/login', controllers.loginCtrl.getToken);
    app.use(controllers.errCtrl.errOne)
    app.use(controllers.errCtrl.errTwo)
};


