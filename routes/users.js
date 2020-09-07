var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log('req in get')

  res.send('respond with a resource')
})

router.post('/', function (req, res, next) {
  console.log('req ', req.body)
  console.log(req.photo) // form files

  res.send('respond with a resource in req body')
})

module.exports = router
