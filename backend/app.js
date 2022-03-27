const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error"); 

app.use(cookieParser());
app.use(express.json());

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

//MiddleWare for Error
app.use(errorMiddleware);

module.exports = app 