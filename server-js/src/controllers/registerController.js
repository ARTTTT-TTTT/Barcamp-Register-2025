const Paticipant = require("../models/participant");
const getEditable = require("./getEditable");

module.exports = (req, res) => {
  let email = req.body.email;

  Paticipant.findOne({ email: email })
    .then(async (update_user) => {
      //old user
      if (update_user) {
        let editable = await getEditable();

        //eidtable
        if (editable) {
          //confirm pdpa
          if (update_user.pdpa) {
            await update_user.updateOne(req.body);

            res.status(200).send({
              error: false,
              data: req.body,
              message: "Paticipant edited successfully.",
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
          //not editable
        } else {
          res.status(200).send({
            error: true,
            message: "Not Time To Edit information.",
          });
        }
        //new user
      } else {
        res.status(200).send({
          error: true,
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
