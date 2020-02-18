const stats = require('./contorllers/stats.controller');
const controllers = require('./contorllers/controllers');
const verifyToken = require('./verify-token');
const addHeaders = require('./add-headers');

// include all controllers
// add verifyToken
module.exports = function(app) {
    app.post('/login', controllers.loginCtrl.getToken);
    app.get('/stats', verifyToken, controllers.statsCtrl.getStats);
    app.get('/books', verifyToken, controllers.booksCtrl.getBook);
    app.post('/books', verifyToken, controllers.booksCtrl.postBook);
    app.use(controllers.errCtrl.errOne)
    app.use(controllers.errCtrl.errTwo)
};


