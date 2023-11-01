const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema({
    questions:{
        type: 'string',
        require: true
    },
    studentName:{
        type: 'string',
        require: true
    },
    numberOfQuestions: {
        type: 'string',
        required: true
    },
    course:{
        type: 'string',
        require: true 
    }
},
{timestamps:true}
)

module.exports = mongoose.model('quiz', quizSchema)