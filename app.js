const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 5000;

const {getHomePage} = require('./routes/index');
const {addItemPage, addItem, deleteItem, editItem, editItemPage} = require('./routes/item');
// const {addItemPage, addItem} = require('./routes/item');



// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'edwardwilliams.me',
    user: 'edwardwi_dbadmin',
    password: '2BZNZkzWL2JKH6qe',
    database: 'edwardwi_inventorydb'
});

// connect to database
db.connect((err) => {
    if (err) {
        console.log('Connectioon to DB failed')
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

//demo
// db.query('SELECT * FROM inventory', (err,rows) => {
//     if(err) throw err;
//     console.log('Data received from Db:\n');
//     console.log(rows);
//     rows.forEach( (row) => {
//         console.log(`${row.asset} is in ${row.campus}`);
//       });
//   });
// set the app to listen on the port


  
// // configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
// app.use(fileUpload()); // configure fileupload

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

// // routes for the app

app.get('/', getHomePage);
app.get('/add', addItemPage);
app.get('/edit/:id', editItemPage);
app.get('/delete/:id', deleteItem);
app.post('/add', addItem);
app.post('/edit/:id', editItem);
