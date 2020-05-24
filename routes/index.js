var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express1' });
});

router.get('/getusers',function(req,res){
  pool.query('SELECT * from  emp', function (error, results, fields) {
    if (error) throw error;
   console.log("error ", error);
    console.log('The solution is: ', results);
    res.send(results)
  });
})

module.exports = router;
