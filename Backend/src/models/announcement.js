const mongoose = require('mongoose')

const announcementSchema = new mongoose.Schema({
    text:{
        type: 'string',
        require: true
    },
    studentName:{
        type: 'string',
        require: true
    },
    course:{
        type: 'string',
        require: true
    }

},
{timestamps:true}
)

module.exports = mongoose.model('announcement', announcementSchema)