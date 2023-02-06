module.exports = {
  newError(msg, status = 500, code) {
    let error = new Error(msg);
    error.status = status;
    if (code) error.code = code;
    return error;
  },
};
