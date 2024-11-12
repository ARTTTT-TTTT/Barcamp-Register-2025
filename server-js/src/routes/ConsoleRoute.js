const { DateTime } = require("luxon");
const express = require("express");
const router = express.Router();
const Console = require("../models/console")

router.get("/console_data", async (req, res) => {
    try {
        // Find the console data document with `name: "control"`
        const consoleData = await Console.findOne({ name: "control" });

        if (!consoleData) {
            return res.status(404).json({ message: "Console data not found." });
        }

        // Respond with the found console data
        res.status(200).json({ message: "Console data retrieved successfully", data: consoleData });

    } catch (error) {
        console.error("Error retrieving console data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/console_data", async (req, res) => {
    try {
        // Destructure the data from the request body
        const { start_register, end_register, vote } = req.body;

        // Validate that the necessary fields are provided
        if (!start_register || !end_register || vote === undefined) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        // Parse and format dates to the desired ISO format with timezone offset
        const startDate = DateTime.fromISO(start_register, { zone: "Asia/Bangkok" }).toISO();
        const endDate = DateTime.fromISO(end_register, { zone: "Asia/Bangkok" }).toISO();

        // Validate the date format after conversion
        if (!startDate || !endDate) {
            return res.status(400).json({ message: "Invalid date format." });
        }

        // Update console data in the database
        const updatedConsole = await Console.findOneAndUpdate(
            { name: "control" }, // Always find the document with the 'name' as 'control'
            { 
                start_register: startDate, 
                end_register: endDate, 
                vote: vote // Update the vote field
            }, 
        );

        if (!updatedConsole) {
            return res.status(404).json({ message: "Console data not found to update." });
        }

        // Respond with success
        res.status(200).json({ message: "Console data updated successfully", data: updatedConsole });

    } catch (error) {
        console.error("Error updating console data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
