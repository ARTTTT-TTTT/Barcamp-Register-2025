const Paticipant = require("../models/participant");
const getEditable = require("./getEditable");

module.exports = async (req, res) => {
  let email = req.body.email;

  try {
    let update_user = await Paticipant.findOne({ email: email });

    // If req.body.special is true, set editable to true immediately
    let editable = req.body.special ? true : await getEditable();

    if (update_user) {
      // Old user
      if (editable) {
        // Confirm PDPA
        if (update_user.pdpa) {
          await update_user.updateOne(req.body);
          res.status(200).send({
            error: false,
            data: req.body,
            message: "Participant edited successfully.",
          });
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
              message: "PDPA not confirmed.",
            });
          }
        }
      } else {
        res.status(200).send({
          error: true,
          message: "Not time to edit information.",
        });
      }
    } else {
      res.status(200).send({
        error: true,
        message: "No user in database or no request body data.",
      });
    }
  } catch (error) {
    res.send({
      error: true,
      message: error.message,
    });
  }
};
