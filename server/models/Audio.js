const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AudioSchema = mongoose.Schema({
    _audioId: mongoose.Schema.Types.ObjectId,
    userId: {
        type: String
    },
    filePath: {
        type: String
    },
    fileName: {
        type: String
    },
    fileSize: {
        type: Number
    },
    fileData: {
        type: Array,
        default: []
    },
},
    { timestamps: true }
)

const Audio = mongoose.model('AudioUpload', AudioSchema);

module.exports = { Audio }