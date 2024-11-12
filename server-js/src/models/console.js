const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConsoleSchema = new Schema({
    start_register: {
        type: Date,
        default: Date.now, // Use the current date and time as the default
    },
    end_register: {
        type: Date,
        default: Date.now, // Use the current date and time as the default
    },
    name: {
        type: String,
        default: "control",
        index: true, // Indexing for optimized searches
    },
    vote: {
        type: Boolean,
        default: false, // Assuming vote is a boolean, default value is false
    },
});

const Console = mongoose.model("Console", ConsoleSchema);
module.exports = Console;
