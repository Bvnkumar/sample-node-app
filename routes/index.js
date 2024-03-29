var express = require('express')
var router = express.Router()
var indexServices = require('../services/index')
/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('index', { title: 'Express123' })
})

router.get('/getusers', function (req, res) {
  indexServices.getUsers((err, result) => {
    if (err) res.status(400).send(err)
    res.status(200).send(result)
  })
})
router.post('/post/kafka/message', async function (req, res) {
  await producer.connect()
  payloads = {
    topic: 'test',
    messages: [{ key: 'coronavirus-alert', value: 'test message' }]
  }
  producer.send(payloads)
  res.status(200).send('A message has been inserted')
})

/**
 * @param no inputs required
 * @returns file data in utf8 format
 */
router.get('/fileread', function (req, res) {
  pathname = path.join(__dirname, '../public/files/sample.txt')
  console.log('pathname ', pathname)
  fs.appendFile(pathname, ' How are you?', 'utf8', (err, writeResult) => {
    if (err) {
    } else {
      log.info('File writing is completed ' + writeResult)
      fs.readFile(pathname, 'utf8', function (err, result) {
        if (err) {
          console.log('error ', err)
        } else {
          log.info('File reading  is completed ' + result)
          console.log('result ', result)
        }
        res.send(result)
      })
    }
  })
})
module.exports = router
