const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConsoleSchema = new Schema({
    start_register: {
        type: Date,
        default: null // Set a default date if appropriate
    },
    end_register: {
        type: Date,
        default: null
    },
    name: {
        type: String,
        default: "control",
        index: true // Indexing for optimized searches
    }
});

const Console = mongoose.model('Console', ConsoleSchema);
module.exports = Console;
