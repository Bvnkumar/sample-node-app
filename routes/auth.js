var express = require("express");
var authrouter = express.Router();
var db = require("../utils/mongodb");

const authCheck = (req, res, next) => {
  console.log("in the auth check");
  next();
};
/**
 * This is middleware function excute whenever an request come to this route
 */
authrouter.use((req, res, next) => {
  console.log("Time:", new Date());
  next();
});
/**
 * Sample route to get the data from mongodb
 */
authrouter.get("/getsample", authCheck, function (req, res) {
  try {
    db.get()
      .db("mydb")
      .collection("users")
      .findOne({}, function (err, result) {
        if (err) {
          log.info("Getting error while accessing the data");
        } else {
          res.send(result);
        }
      });
  } catch (error) {
    console.log("error ", error);
  }
});

/**
@param object with reuired fileds for user creation
@returns token
*/
authrouter.post("/signup", function (req, res) {
  console.log("req ", req.body);
  try {
    req.body.password = bcrypt.generate(req.body.password);
    pool.query("insert into user set ?", req.body, function (err, userResult) {
      if (err) {
        console.log("err", err);
      }
      log.info("User Profile inserted successfully");
      res.send("received output");
    });
  } catch (error) {
    log.error("Error occured in catch" + e);
    res.status(500).send("Error occured");
  }
});

/**
@param object with username and password
@returns token
*/
authrouter.post("/login", function (req, res) {
  let email = req.body.email;
  var sql = "SELECT * FROM user WHERE email = " + mysql.escape(email);
  var sql1 = "select * from user";

  try {
    pool.query(sql1, function (err, userResult) {
      if (err) {
        res.status(500).send("Error found while gettting data");
      } else {
        if (userResult) {
          if (bcrypt.verify(req.body.password, userResult[0].password)) {
            let token = jwt.sign({ user_id: userResult[0].id }, "sample");
            log.info("User logged in successfully");
            res.status(200).send("user data found " + token);
          } else {
            log.warn("Invalid Credentials");
            res.status(400).send("invalid credentials");
          }
        } else {
          log.warn("no user data found");
          res.status(200).send("no user data found");
        }
      }
    });
  } catch (e) {
    log.error("Error occured in catch" + e);
    res.status(500).send("Error occured");
  }
});

/**
@param token-string
@returns decoded code or error response.
*/
authrouter.post("/tokenverify", function (req, res) {
  let token = req.body.token;
  var decoded = jwt.verify(token, "sample");
  if (decoded) {
    log.info("token verified " + JSON.stringify(decoded));

    res.send(decoded);
  } else {
    log.error("Invalid token");

    res.status(400).send("in valid token");
  }
});

authrouter.post("/profile", upload.single("avatar1"), function (
  req,
  res,
  next
) {
  console.log("in the req.file ", req.file);
  res.end();
});

authrouter.get("/upload", function (req, res) {
  res.render("fileupload");
});
module.exports = authrouter;
