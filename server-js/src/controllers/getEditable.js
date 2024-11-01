const Console = require("../models/console");

const getEditable = async () => {
  const console_lst = await Console.findOne({ name: "control" });
  return (
    new Date(console_lst.end_register).getTime() - new Date().getTime() > 0
  );
};

module.exports = getEditable;
