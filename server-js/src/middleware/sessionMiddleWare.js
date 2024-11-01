module.exports = (req, res, next) => {

    if (req.user) {
        next()
    } else {
        res.send({
            error: true,
            message: "No user session."
        })
    }

}