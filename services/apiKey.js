const { v4: uuidv4 } = require("uuid");
const { generateApiKey } = require("generate-api-key");
const connection = require("../configs/databases");
const BalanceService = require("./balance");
const config = require("../configs/app");
const { newError } = require("../helpers");
const tableName = "ss_api_tokens";

module.exports = {
  async findAll() {
    try {
      let [results] = await connection.query(`SELECT * FROM ${tableName}`);
      return results;
    } catch (error) {
      return Promise.reject(newError(error));
    }
  },

  async findById(id) {
    try {
      let [results] = await connection.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);
      if (results.length < 1) {
        return Promise.reject(newError("id: not found", 404));
      }
      return results;
    } catch (error) {
      return Promise.reject(newError(error));
    }
  },

  async findByApiKey(apiKey) {
    try {
      let [results] = await connection.query(`SELECT * FROM ${tableName} WHERE apiKey = ?`, [apiKey]);
      if (results.length < 1) {
        return Promise.reject(newError("api key: not found", 404));
      }
      return results;
    } catch (error) {
      return Promise.reject(newError(error));
    }
  },

  async checkApiKey(apiKey) {
    try {
      const [apiKeyData] = await this.findByApiKey(apiKey);
      // check api key type 1: trial, 2: commerce, 3: lifetime
      if (apiKeyData.typeId === 3) return { userId: apiKeyData.userId, apiKey: apiKeyData.apiKey };
      if ([1, 2].includes(+apiKeyData.typeId)) {
        const balance = await BalanceService.findByApiKey(apiKey);
        if (!balance.quotaRemain) return Promise.reject(newError("not enough quota", 400));
        await BalanceService.update(balance.id, { quotaRemain: balance.quotaRemain - 1 });
        return { userId: balance.userId, planId: balance.planId };
      }
      return;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async insert(payload) {
    const body = {
      id: uuidv4(),
      apiKey: generateApiKey(),
      label: payload.label,
      typeId: payload.typeId,
      userId: payload.userId,
    };
    try {
      await connection.query(`INSERT INTO ${tableName} SET ?`, body);
      return body;
    } catch (error) {
      return Promise.reject(newError(error));
    }
  },

  async update(id, payload) {
    try {
      await connection.query(`UPDATE ${tableName} SET ? WHERE id=?`, [payload, id]);
      return { msg: "updated success" };
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async delete(id) {
    try {
      await connection.query(`UPDATE ${tableName} SET ? WHERE id=?`, [payload, id]);
      return { msg: "deleted success" };
    } catch (error) {
      return Promise.reject(newError(error));
    }
  },
};
