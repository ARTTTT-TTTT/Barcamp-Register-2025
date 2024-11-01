const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, req.body.id + ".png");
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
