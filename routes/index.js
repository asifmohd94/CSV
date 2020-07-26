const express = require('express');
const router = express.Router();
const File = require('../models/file');


router.get('/', async (req, res) => {
    try {
        let lists = await File.find({}).sort('-createdAt');
         
        if(lists.length == 0){
            throw new Error('file not found');
        }
        
        res.render('home', {fileLists: lists});
    } catch (err) {
        console.log("Error in getting file" + err);
        res.render('home', {error: err.message});
    }
});


router.use('/file', require('./file'));

module.exports = router;