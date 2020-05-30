var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express123" });
});

router.get("/getusers", function (req, res) {
  pool.query("SELECT * from  emp", function (error, results, fields) {
    if (error) throw error;
    console.log("error ", error);
    console.log("The solution is: ", results);
    res.send(results);
  });
});

/**
 * @param no inputs required
 * @returns file data in utf8 format
 */
router.get("/fileread", function (req, res) {
  pathname = path.join(__dirname, "../public/files/sample.txt");
  console.log("pathname ", pathname);
  fs.appendFile(pathname, " How are you?", "utf8", (err, writeResult) => {
    if (err) {
    } else {
      log.info("File writing is completed " + writeResult);
      fs.readFile(pathname, "utf8", function (err, result) {
        if (err) {
          console.log("err ", err);
        } else {
          log.info("File reading  is completed " + result);
          console.log("result ", result);
        }
        res.send(result);
      });
    }
  });
});
module.exports = router;
