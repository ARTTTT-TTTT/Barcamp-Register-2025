const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ConsoleSchema = new Schema({
    start_register: {
        type: Date,
    },
    end_register: {
        type: Date,
    },
    name: {
        type: String,
        default: "control"
    }
})

const Console = mongoose.model('console', ConsoleSchema)
module.exports = Console