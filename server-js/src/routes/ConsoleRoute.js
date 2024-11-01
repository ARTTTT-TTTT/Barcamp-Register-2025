const router = require("express").Router();
const Console = require('../models/console')

router.get("/console", (req, res) => {
    Console.findOne({ name: "control" }).then(data => {

        res.status(200).send(data)

    })
})

module.exports = router