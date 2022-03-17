const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const cors = require("cors");

// LOAD env vars
dotenv.config({ path: "./config/config.env" });

// Export Route files
const dataRouter = require("./src/routes/dataRoute");

const app = express();

// Body Parser
app.use(express.json());

// Dev logging middleware
if (process.env.Node_Env === "development") {
  app.use(morgan);
}

// CORS
app.use(cors());

//Cookie parser
app.use(cookieParser());

// Mount routers
app.use("/leads", dataRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT);

//Handle unhandled rejections
process.on("unhandledRejection", (err, promise) => {
  console.log("error", err.message);

  // Close server and exit process
  server.close(() => process.exit(1));
});
