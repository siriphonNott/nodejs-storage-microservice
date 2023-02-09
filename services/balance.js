const { v4: uuidv4 } = require("uuid");
const connection = require("../configs/databases");
const config = require("../configs/app");
const { newError } = require("../helpers");
const tableName = "ss_balances";

module.exports = {
  async findAll() {
    try {
      let [results] = await connection.query(`SELECT * FROM ${tableName}`);
      return results
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

  async insert(payload) {
    const body = {
      id: uuidv4(),
      userId: payload.userId,
      planId: payload.planId,
      apiKey: payload.apiKey,
      quotaRemain: payload.quotaRemain,
    }
    try {
      await connection.query(`INSERT INTO ${tableName} SET ?`, body)
      return body
    } catch (error) {
      return Promise.reject(newError(error));
    }
  },

  async update(id, payload) {
    try {
      await connection.query(`UPDATE ${tableName} SET ? WHERE id=?`, [payload, id])
      return { msg: "updated success" };
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async delete(id) {
    try {
      await connection.query(`UPDATE ${tableName} SET ? WHERE id=?`, [payload, id])
      return { msg: "deleted success" };
    } catch (error) {
      return Promise.reject(newError(error));
    }
  },

  async findByApiKey(apiKey) {
    try {
      let [results] = await connection.query(`SELECT * FROM ${tableName} WHERE apiKey = ?`, [apiKey]);
      if (results.length < 1) {
        return Promise.reject(newError("balance: not found", 404));
      }
      return results[0];
    } catch (error) {
      return Promise.reject(newError(error));
    }
  },
};
