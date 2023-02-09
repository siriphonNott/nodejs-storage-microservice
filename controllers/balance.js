const Service = require("../services/balance");
const { checkBodyEmpty, checkAllowFields } = require("../helpers");

const allowFields = {
  create: ["userId", "planId", "apiKey", "quotaRemain"],
  update: ["planId", "apiKey", "quotaRemain"],
};

module.exports = {
  async onGetAll(req, res) {
    try {
      const results = await Service.findAll(req, res);
      res.success(results);
    } catch (error) {
      res.error(error);
    }
  },

  async onGetById(req, res) {
    try {
      const [result] = await Service.findById(req.params.id);
      res.success(result);
    } catch (error) {
      res.error(error);
    }
  },

  async onCreate(req, res) {
    try {
      checkAllowFields(req.body, allowFields.create);
      const result = await Service.insert(req.body);
      res.success(result);
    } catch (error) {
      res.error(error);
    }
  },

  async onUpdate(req, res) {
    try {
      await Service.findById(req.params.id);
      checkBodyEmpty(req.body);
      checkAllowFields(req.body, allowFields.update);
      const result = await Service.update(req.params.id, req.body);
      res.success(result);
    } catch (error) {
      res.error(error);
    }
  },

  async onDelete(req, res) {
    try {
      await Service.findById(req.params.id);
      const result = await Service.delete(req.params.id);
      res.success(result);
    } catch (error) {
      res.error(error);
    }
  },
};
