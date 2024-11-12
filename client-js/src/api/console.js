import config from "../services/config";

const getConsole = async () => {
    try {
        const response = await fetch(`${config.apiPrefix}/console`, {
            // Corrected template literal syntax
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

const postConsole = async (data) => {
    try {
        const response = await fetch(`${config.apiPrefix}/console`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data), // ส่งข้อมูลในรูปแบบ JSON
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData; // ส่งข้อมูลที่ได้จาก API
    } catch (error) {
        console.error("Error during API call:", error);
        return { error: error.message };
    }
};

export { postConsole, getConsole };
