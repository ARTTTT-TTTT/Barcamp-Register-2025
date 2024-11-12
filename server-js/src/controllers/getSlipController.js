const path = require("path");
const fs = require("fs");
const Paticipant = require("../models/participant");

exports.getPicture = async (req, res) => {
  try {
    const update_user = await Paticipant.findOne({ email: res.params });
    console.log(update_user)
    
    if (!update_user || !update_user.slip) { // assuming 'slip' holds the path
      return res.status(404).send("Participant or picture not found");
    }

    // Extract the filename from the stored file path
    const filename = update_user.slip.replace(/^uploads[\\\/]/, ''); // Adjust as needed for the actual field
    const fullFilePath = path.join(__dirname, "../../uploads", filename);

    // Check if the file exists using fs.access
    fs.access(fullFilePath, fs.constants.F_OK, (err) => {
      if (err) {
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
  } catch (error) {
    console.error("Error retrieving picture:", error);
    res.status(500).send("Internal Server Error");
  }
};
