const { newError } = require("../helpers");
const ApiKeyService = require("../services/apiKey");

const getApiKeyFromHeader = (req, res, next) => {
  const apiKey = req.headers["ss-api-key"];
  if (!apiKey) {
    throw newError("must have api key", 403);
  } else {
    ApiKeyService.checkApiKey(apiKey)
      .then((data) => {
        req.apiKeyData = data
        next();
      })
      .catch((error) => {
        res.error(error);
      });
  }
};

const auth = {
  checkApiKey: getApiKeyFromHeader,
};

module.exports = auth;
