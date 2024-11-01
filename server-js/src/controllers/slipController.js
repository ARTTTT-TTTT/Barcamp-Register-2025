const Paticipant = require("../models/participant");
const getEditable = require("./getEditable");
require("dotenv").config();

module.exports = (req, res) => {
  let id = req.body.id;
  let slip = req.file;

  Paticipant.findById(id)
    .then(async (update_user) => {
      //old user
      if (update_user) {
        let editable = await getEditable();

        //confirm pdpa
        if (update_user.pdpa) {
          update_user.slip = slip.path;
          update_user.save();

          res.status(200).send({
            error: false,
            slip: slip.path,
            message: "Slip uploaded successfully.",
          });
          //not confirm pdpa
        } else {
          if (req.body.pdpa) {
            await update_user.updateOne(req.body);

            res.status(200).send({
              error: false,
              message: "Update PDPA Complete.",
            });
          } else {
            res.status(200).send({
              error: true,
              message: "PDPA not confirm.",
            });
          }
        }


        //new user
      } else {
        res.status(200).send({
          error: true,
          test: req.body,
          message: "No User in database or no request body data.",
        });
      }
    })
    .catch((error) => {
      res.send({
        error: true,
        message: error.errors,
      });
    });
};
