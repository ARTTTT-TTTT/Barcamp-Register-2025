const Paticipant = require("../models/participant");

module.exports = (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).json({ error: "ID is required" });
    }

    Paticipant.findById(id)
        .then((data) => {
            if (!data) {
                return res.status(404).json({ error: "User not found" });
            }
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json({ error: "Server error", details: err });
        });
};
