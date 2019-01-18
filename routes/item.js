const fs = require('fs');

module.exports = {
    addItemPage: (req, res) => {
        res.render('add-inventory.ejs', {
            title: 'Aldine ISD | Add a new item',
            message: ''
        });
    },
    addItem: (req, res) => {
        let message = '';
        let purchase_order = req.body.purchase_order;
        let manufacturer = req.body.manufacturer;
        let model = req.body.model;
        let serial = req.body.serial;
        let asset_tag = req.body.asset_tag;
        let campus = req.body.campus;

        let assetQuery = "SELECT * FROM `inventory` WHERE asset = '" + asset_tag + "'";

        db.query(assetQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Asset already exists';
                res.render('add-inventory.ejs', {
                    message,
                    title: 'Welcome to Socka | Add a new item'
                });
            } else {
                // check the filetype before uploading it

                // send the items's details to the database
                let query = "INSERT INTO `inventory` (purchase_order, manufacturer, model, serial, asset, campus) VALUES ('" +
                    purchase_order + "', '" + manufacturer + "', '" + model + "', '" + serial + "', '" + asset_tag + "', '" + campus + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });


            }
        });
    },

    editItemPage: (req, res) => {
        let itemId = req.params.id;
        let query = "SELECT * FROM `inventory` WHERE id = '" + itemId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-inventory.ejs', {
                title: 'Edit  Item',
                item: result[0],
                message: ''
            });
        });
    },
    editItem: (req, res) => {
        let itemId = req.params.id;
        let purchase_order = req.body.purchase_order;
        let manufacturer = req.body.manufacturer;
        let model = req.body.model;
        let serial = req.body.serial;
        let asset_tag = req.body.asset_tag;
        let campus = req.body.campus;

        let query = "UPDATE `inventory` SET `purchase_order` = '" + purchase_order + "', `manufacturer` = '" + manufacturer + "', `model` = '" + model + "', `serial` = '" + serial + "' WHERE `inventory`.`id` = '" + itemId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteItem: (req, res) => {
        let itemId = req.params.id;
        let deleteItemQuery = 'DELETE FROM inventory WHERE id = "' + itemId + '"';
        db.query(deleteItemQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    }
};