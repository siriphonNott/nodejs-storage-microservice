import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import errorHandler from "./configs/errorHandler.js";
import responseFormat from "./configs/responseFormat.js";
import middleware from "./configs/middleware.js";
import config from "./configs/app.js";
import logger from "./configs/logger.js";
const app = express();

// CORS
app.use(cors());

// Connect database
import "./configs/databases.js";

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Custom Response Format
app.use(responseFormat);

// Middleware
app.use(middleware);

// Routes
app.use(routes);

// Handle error
errorHandler(config.isProduction, app);

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
