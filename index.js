const express = require("express");
const cors = require("cors");
const config = require("./configs/app");
const logger = require("./configs/logger");
const app = express();

// CORS
app.use(cors());

// Connect database
require("./configs/databases");

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Custom Response Format
app.use(require("./configs/responseFormat"));

// Middleware
require("./configs/middleware");

// Routes
app.use(require("./routes"));

// Handle error
require("./configs/errorHandler")(config.isProduction, app);

// Start Server
const server = app
  .listen(config.port, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log(`Server is running on http://${host}:${port}`);
  })
  .on("error", function (err) {
    logger.error("[start server error]:");
    logger.error(JSON.stringify(err));
  });
