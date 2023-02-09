const bcrypt = require('bcrypt');

const newError = (msg, status = 500, code) => {
  let error = new Error(msg);
  error.status = status;
  if (code) error.code = code;
  return error;
};

const checkBodyEmpty = (body) => {
  if (!body || !Object.keys(body).length) throw newError("have not any field update", 400);
};

const checkAllowFields = (body, allowFields) => {
  if (Object.keys(body).some((v) => !allowFields.includes(v))) throw newError("some field not allowed", 400);
};

const generateHash = (text) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(text, salt);
};

const isHashValid = (plaintext, hashVal) => {
  return bcrypt.compareSync(plaintext , hashVal)
};

module.exports = {
  newError,
  checkBodyEmpty,
  checkAllowFields,
  generateHash,
  isHashValid
};
