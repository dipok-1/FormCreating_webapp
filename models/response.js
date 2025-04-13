
const mongoose = require('mongoose')
const responseschema = mongoose.Schema({

formId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Form',
    required:true
},
answers:[
    {
        questionId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
        },
        answer:{
            type: mongoose.Schema.Types.Mixed,
            required: true
        }

    }
]

},{timestamps:true})


const Response = mongoose.model('Response',responseschema)
module.exports = Response