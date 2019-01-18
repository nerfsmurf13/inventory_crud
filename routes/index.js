module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `inventory` ORDER BY id ASC"; // query database to get all inventory

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: 'Aldine ISD Inventory Example | View Inventory',
                inventory: result
            });
        });
    },
};