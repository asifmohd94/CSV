const mongoose = require('mongoose');


const fileSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    originalName: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
}, { timestamps: true });


fileSchema.statics.uploadPath = '/csv_uploads';


module.exports = mongoose.model('File', fileSchema);