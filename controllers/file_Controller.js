const multer = require('multer');
const fs = require('fs');
const path = require('path');
const File = require('../models/file');
const csv = require('csv-parser');


const storage = multer.diskStorage({
     
    destination: function (req, file, cb) {
        if(fs.existsSync('csv_uploads')){
            cb(null, path.join(__dirname, '..', File.uploadPath))
        }else{
            
            fs.mkdirSync('csv_uploads');
            cb(null, 'csv_uploads')
        }
    },
   
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
});

module.exports.uploadFile = (req, res) => {
    upload(req, res, async function(err) {
        if(err) {
            console.log('Error in uploading file');
            return res.render('home', {error: "Error in uploading file"});
        }
        try {
            if(!req.file) {
                throw new Error('Please select a file to upload');
            }

            
            await File.create({
                fileName: req.file.filename,
                originalFileName: req.file.originalname,
                path: File.uploadPath + '/' + req.file.filename
            })
            res.redirect('/');
        } catch (err) {
            
            console.log("Internal server error");
            return res.render('home', {error: err.message});
        }
    });
}

const upload = multer({storage: storage}).single('csvFile');

module.exports.getDetails = async (req, res) => {
    try {
        
        let file = await File.findById(req.params.id);
        
        if(!file) {
            throw new Error('File not found!');
        }

        const results = [];
        
        fs.createReadStream(path.join(__dirname, '..', file.path))
        .on('error', (err) => {
            console.log("Error in getting file details");
            return res.render('home', {error: 'Error while getting file details'})
        })
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            return res.render(
                'home',
                {
                fileDetails: {
                    name: file.originalFileName,
                    keys: Object.keys(results[0]),
                    content: results
                    }
                }
            );
        })
    } catch (err) {
        console.log("Internal Error in getting file details");
        res.render('home', {error: err.message});
    }
}
