const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const routes = require("./routes/userRoutes");
const menuCrudRoutes = require("./routes/menuCrudRoutes");
const mainRoutes = require("./routes/mainRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const blogCrudRoutes = require("./routes/blogCrudRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const bodyParser = require("body-parser");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://eriaaenquiries:Makeweunwind@eriaa.xgd8ess.mongodb.net/eriaa?retryWrites=true&w=majority";
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// app.use("/api/users", routes);

//  user routes
app.use("/", routes)

app.use("/", blogCrudRoutes);
app.use("/", adminRoutes);
app.use("/", menuCrudRoutes);
app.use("/", mainRoutes);
app.use("/", reservationRoutes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
