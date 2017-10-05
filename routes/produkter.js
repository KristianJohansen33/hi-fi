const db = require('../config/sql').connect();

module.exports = function (app) {
    app.get('/produkter', function (req, res) {
        db.query('select * from produkter', function (err, data) {
            res.send(data);
        })
    })
}

    // app.get('/produkt/:id', function (req, res) {
    //     db.query('select * from fruit where fk_type = ?', [req.params.id], function (err, data) {
    //         res.send(data);
    //     })
    // })