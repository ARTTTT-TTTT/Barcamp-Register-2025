const path = require("path");

exports.getPicture = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../../uploads", filename);

  res.setHeader("Content-Type", "image/png"); // Ensure correct Content-Type for PNG
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).send("Internal Server Error");
    }
  });
};
