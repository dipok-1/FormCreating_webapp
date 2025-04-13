const mongoose = require('mongoose')

const formschema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    questions:[{
        questiontext:{
            type:String,
            required:true
        },
        questiontype:{
            type:String,
            enum: ['text', 'radio', 'checkbox', 'dropdown'],
            required:true
        },
        options:{
            type: [String],
            default: []
        },
        isrequired:{
            type:Boolean,
            default:false
        }

    }],
    createdby:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    formstatus:{
        type:String,
        enum:['active','closed'],
        default:'active'
    }

},{timestamps:true})

const Form = mongoose.model('form',formschema)
module.exports = Form