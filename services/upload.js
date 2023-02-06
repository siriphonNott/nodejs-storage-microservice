const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const connection = require("../configs/databases");
const config = require("../configs/app");
const { newError } = require("../helpers/error");

const tableName = "storage";

module.exports = {
  async findById(id) {
    try {
      let [results] = await connection.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);
      if (results.length < 1) {
        return Promise.reject(newError("not found", 404));
      }
      return results[0].base64;
    } catch (error) {
      Promise.reject(newError(error));
    }
  },
  onUpload(req, res) {
    return new Promise((resolve, reject) => {
      const upload = multer({
        limits: { fileSize: config.limitFileSize },
      }).single("file");
      upload(req, res, async (err) => {
        if (err) {
          reject(newError(err));
        } else {
          const base64 = req.file.buffer.toString("base64");
          const id = uuidv4();
          try {
            await connection.query(`INSERT INTO ${tableName} SET ?`, {
              id,
              base64,
            });
            resolve({ url: `${config.baseUrl}/static/${id}` });
          } catch (error) {
            reject(newError(error));
          }
        }
      });
    });
  },
  async onDelete(id) {
    try {
      const [results] = await connection.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);
      if (results.length < 1) {
        return Promise.reject(newError("path: not found", 404));
      }
      await connection.query(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
      return { msg: "deleted success" };
    } catch (error) {
      Promise.reject(newError(error));
    }
  },
};
