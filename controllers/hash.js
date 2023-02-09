const { generateHash, isHashValid} = require("../helpers");

module.exports = {
  async onGenerateHash(req, res) {
    try {
      res.success({
        text: req.body.text,
        hash: generateHash(req.body.text)
      });
    } catch (error) {
      res.error(error);
    }
  },

  async onCheckHash(req, res) {
    try {
      res.success({
        text: req.body.text,
        hash: req.body.hash,
        valid: isHashValid(req.body.text, req.body.hash)
      });
    } catch (error) {
      res.error(error);
    }
  },
};
