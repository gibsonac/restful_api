let mongoose = require('mongoose');
let uniqueValid = require('mongoose-unique-validator'); // oooo mongoose unique valids!!
let Schema = mongoose.Schema;

let taskSchema = new Schema({
    title: {
        type: String,
        trim: true,
        unique: true,// unique? TRUE?
        required: [true, "You need a title for your task"],
        minlength: [4, "Title length must be longer than 4 characters"]
    },
    desc: {
        type: String,
        trim: true, // trim will truncate strings from "this has spaces   " to "this has spaces"
        default: ""
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    }
}, {timestamps: true});

// we can attach unique valid as a plugin to make any field unique
taskSchema.plugin(uniqueValid, {message: `{PATH} must be unique!`});

// make the model
mongoose.model('Task', taskSchema);