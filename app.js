const express = require("express");
const session = require("express-session");
const methodOverride = require('method-override');
const mime = require('mime');
const mongoose = require("mongoose");
const morgan = require("morgan");
const routes = require("./routes/userRoutes");
const menuCrudRoutes = require("./routes/menuCrudRoutes");
const mainRoutes = require("./routes/mainRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const contactRoutes = require("./routes/contactRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const blogCrudRoutes = require("./routes/blogCrudRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const bodyParser = require("body-parser");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://eriaaenquiries:Makeweunwind@eriaa.xgd8ess.mongodb.net/eriaa?retryWrites=true&w=majority';
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.log(err);
    console.log('cant connect to db')
  });

const app = express();


// Configure method-override
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/", routes);
app.use("/", blogCrudRoutes);
app.use("/", adminRoutes);
app.use("/", menuCrudRoutes);
app.use("/", mainRoutes);
app.use("/", reservationRoutes);
app.use("/", contactRoutes);
app.use("/", checkoutRoutes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
