const path = require("path");
const fs = require("fs");

exports.getPicture = (req, res) => {
  // Get the full file path from req and extract the filename
  let filePath = req.params.slip;

  // Remove the "uploads\" part from the path
  const filename = filePath.replace(/^uploads[\\\/]/, ''); // Regular expression to remove 'uploads\' or 'uploads/'

  // Construct the full file path
  const fullFilePath = path.join(__dirname, "../../uploads", filename);

  console.log("File path:", fullFilePath);

  // Check if the file exists
  fs.exists(fullFilePath, (exists) => {
    if (!exists) {
      return res.status(404).send("File not found");
    }

    // Send the file if it exists
    res.sendFile(fullFilePath, (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).send("Internal Server Error");
      }
    });
  });
};
