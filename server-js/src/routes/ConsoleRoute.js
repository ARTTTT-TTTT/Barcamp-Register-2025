router.post("/console_data", async (req, res) => {
    try {
        // Destructure the data from the request body
        const { start_register, end_register, vote } = req.body;

        // Validate that the necessary fields are provided
        if (!start_register || !end_register || vote === undefined) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        // If you want to ensure that `start_register` and `end_register` are valid dates:
        const startDate = new Date(start_register);
        const endDate = new Date(end_register);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
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
