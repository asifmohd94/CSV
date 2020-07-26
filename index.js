const express = require('express');
const port = 8000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/mongoose');
const multer = require('multer');

//import morgan logger middleware 
const morgan = require('morgan');

const app = express();

//require view engine 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

//use morgan
app.use(morgan('dev'));

//using body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'assets')));


app.use('/', require('./routes/index'));

//listen port
app.listen(port, function(err){
    if(err){
        console.log(`Error:, ${err}`);
    }
    console.log(`Server is up and running on port: ${port}`);
});
