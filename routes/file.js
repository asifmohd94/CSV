const express = require('express');
const router = express.Router();
const file_Controller = require('../controllers/file_Controller');


router.get('/:id', file_Controller.getDetails);
router.post('/upload', file_Controller.uploadFile);


module.exports = router;
