
module.exports = {
    getBook (req, res){
        return res.send({book: 'The Hobbit'})
    },

    postBook (req, res) {
        return res.send('post book function');
    },


};
