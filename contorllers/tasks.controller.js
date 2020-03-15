
module.exports = {
    getTask (req, res){
        return res.send({task: 'The Hobbit'})
    },

    postTask (req, res) {
        return res.send('post task function');
    },
};
