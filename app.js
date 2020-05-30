var createError = require("http-errors");
var express = require("express");
path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
jwt = require("jsonwebtoken");
bcrypt = require("password-hash");
winston = require("winston");
fs = require("fs");
var multer = require("multer");
mysql = require("mysql");

//Log configuration
log = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});
//setting file directory for file uploads
upload = multer({ dest: "uploads/" });

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var db = require("./utils/mongodb");
db.connect((err, result) => {
  if (err) {
    console.log("err ", err);
  }
  console.log("Db connected");
});

//Mysql connection
pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  port: 3309,
  user: "root",
  password: "test",
  database: "practical_db",
});

pool.on("error", function (err) {
  console.log("[mysql error]", err);
});

app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
