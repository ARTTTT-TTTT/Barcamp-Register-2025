const router = require("express").Router();
const Console = require('../models/console')

router.get("/console", (req, res) => {
    Console.findOne({ name: "control" }).then(data => {

        res.status(200).send(data)

    })
})

router.post("/add-console-data", async (req, res) => {
    try {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1); // Set to yesterday

        // Create console data for yesterday
        const consoleData = {
            start_register: yesterday,
            end_register: new Date(yesterday.getTime() + 86400000), // Adding 24 hours
            name: "control"
        };

        // Insert the console data into the database
        const newConsole = await Console.create(consoleData); // Using create for a single document
        res.status(201).json({ message: "Console data added successfully", data: newConsole });
    } catch (error) {
        console.error("Error adding console data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router