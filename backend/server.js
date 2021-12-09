const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
console.clear();

const authRouter = require("./Auth/Routes/auth");
// const cityRouter = require("./City/routes/city");
const newsRouter = require("./News/routes/news");
// const searchRouter = require("./Search/routes/search");
// const userRouter = require("./User/routes/user");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secret"));
app.use(passport.initialize());
app.use(passport.session());
// require("./passportConfig")(passport);

const DBURI = process.env.MONGO_DB_URI;

mongoose.connect(
  DBURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("Failed to connect database " + err);
    } else {
      console.log("Database connected successfully......");
    }
  }
);
app.use("/api/auth", authRouter);
// app.use("/api/city", cityRouter);
app.use("/api/news", newsRouter);
// app.use("/api/search", searchRouter);
// app.use("/api/users/", userRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
