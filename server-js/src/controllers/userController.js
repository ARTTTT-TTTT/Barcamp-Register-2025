const Paticipant = require("../models/participant");

module.exports = (req, res) => {

    let id = req.query.id

    Paticipant.findById(id).then(data => {
        res.status(200).json(data)
    }).catch(err => {
        res.status(200).json(err)
    })

}