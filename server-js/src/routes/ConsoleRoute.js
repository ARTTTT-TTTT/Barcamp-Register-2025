const { DateTime } = require("luxon");
const express = require("express");
const router = express.Router();
const Console = require("../models/console");

router.get("/console", async (req, res) => {
    try {
        // Find the console data document with `name: "control"`
        const consoleData = await Console.findOne({ name: "control" });

        if (!consoleData) {
            return res.status(404).json({ message: "Console data not found." });
        }

        // Respond with the found console data
        res.status(200).json(consoleData);
    } catch (error) {
        console.error("Error retrieving console data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/console", async (req, res) => {
    try {
        const { start_register, end_register, vote } = req.body;

        if (!start_register || !end_register || vote === undefined) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        // Parse start_register date, add 1 day, set time zone to Thailand, and format as ISO
        const startDate = DateTime.fromISO(start_register, { zone: "utc" }) // Ensure parsing as UTC
            .setZone("Asia/Bangkok") // Set to Thailand time zone (UTC +7)
            .toISO(); // Convert to ISO format

        // Parse end_register date, add 1 day, set time to 23:59:59, set time zone to Thailand, and format as ISO
        const endDate = DateTime.fromISO(end_register, { zone: "utc" }) // Ensure parsing as UTC
            .set({ hour: 23, minute: 59, second: 59 }) // Set time to 23:59:59
            .setZone("Asia/Bangkok") // Set to Thailand time zone (UTC +7)
            .toISO(); // Convert to ISO format

        if (!startDate || !endDate) {
            return res.status(400).json({ message: "Invalid date format." });
        }

        const updatedConsole = await Console.findOneAndUpdate(
            { name: "control" },
            {
                start_register: startDate,
                end_register: endDate,
                vote: vote,
            },
            { new: true }
        );

        if (!updatedConsole) {
            return res.status(404).json({ message: "Console data not found to update." });
        }

        res.status(200).json(updatedConsole); // ตอบกลับข้อมูลที่ได้รับการอัปเดต
    } catch (error) {
        console.error("Error updating console data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});



module.exports = router;
