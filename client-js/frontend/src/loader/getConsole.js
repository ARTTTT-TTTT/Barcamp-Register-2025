import config from "../../config";

const getConsole = async () => {
    try {
        const response = await fetch(`${config.apiPrefix}/console`, { // Corrected template literal syntax
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        // Check the response status
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); // Use template literal correctly
        }

        return await response.json(); // Return the parsed JSON response
    } catch (error) {
        return { error: error.message }; // Return error message if catch block is executed
    }
};

export default getConsole; // Export the function for use in other modules
