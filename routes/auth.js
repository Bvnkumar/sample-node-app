var express = require('express')
var authrouter = express.Router()
var db = require('../utils/mongodb')

const authCheck = (req, res, next) => {
  console.log('in the auth check')
  next()
}
/**
 * This is a middleware function which execute whenever an request comes into this route
 */
authrouter.use((req, res, next) => {
  console.log('Time:', new Date())
  next()
})

authrouter.get('/getUsers', async function (req, res) {
  try {
    console.log('db ', db)
    // db.get().db("mydb1").collection("users").find();
    db.get()
      .db('mydb1')
      .collection('users')
      .find({}, { projection: { _id: 0 } })
      .toArray(function (err, result) {
        if (err) throw err
        console.log('result ', result)
        res.send(result)
        db.close()
      })
  } catch (error) {
    console.log('error ', error)
    res.status(500).send('Error occured')
  }
})
/**
 * Sample route to get the data from mongodb
 */
authrouter.get('/getsample', authCheck, async function (req, res) {
  try {
    // db.get()
    //   .db("mydb1")
    //   .collection("users")
    //   .findOne({}, function (err, result) {
    //     if (err) {
    //       log.info("Getting error while accessing the data");
    //     } else {
    //       res.send(result);
    //     }
    //   });
    //   db.get()
    //   .db("mydb1")
    //   .collection("users")
    //   .aggregate([
    //     {
    //       $lookup:
    //         {
    //           from: "Admins",
    //           localField: "email",
    //           foreignField: "email",
    //           as: "result"
    //         }
    //    }]
    //  , function (err, result) {
    //     if (err) {
    //       log.info("Getting error while accessing the data");
    //     } else {
    //       res.send(result);
    //     }
    //   });

    //   db.users.aggregate([
    //     {
    //       $lookup:
    //         {
    //           from: "Admins",
    //           localField: "email",
    //           foreignField: "email",
    //           as: "result"
    //         }
    //    }
    //  ])
    const docs = await db
      .get()
      .db('mydb1')
      .collection('users')
      .aggregate([
        {
          $lookup: {
            from: 'Admins',
            localField: 'email',
            foreignField: 'email',
            as: 'stock'
          }
        },
        {
          $unwind: '$stock'
        },
        {
          $project: {
            _id: 0,
            // ticker: '$stock.ticker',
            // currentPrice: '$stock.currentPrice',
            // basePrice: 1,
            email: 1
          }
        }
      ])
      .toArray()
    res.send(docs)
  } catch (error) {
    console.log('error ', error)
  }
})

/**
@param object with reuired fileds for user creation
@returns token
*/
authrouter.post('/signup', function (req, res) {
  console.log('req ', req.body)
  try {
    req.body.password = bcrypt.generate(req.body.password)
    pool.query('insert into user set ?', req.body, function (err, userResult) {
      if (err) {
        console.log('err', err)
      }
      log.info('User Profile inserted successfully')
      res.send('received output')
    })
  } catch (error) {
    log.error('Error occured in catch' + e)
    res.status(500).send('Error occured')
  }
})

/**
@param object with username and password
@returns token
*/
/**
 *@swagger
 * /login:
 *   get:
 *     tags:
 *       - login
 *     description:
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *          description: it sends jwt token
 */
authrouter.post('/login', function (req, res) {
  let email = req.body.email
  var sql = 'SELECT * FROM user WHERE email = ' + mysql.escape(email)
  var sql1 = 'select * from user'

  try {
    pool.query(sql1, function (err, userResult) {
      if (err) {
        res.status(500).send('Error found while gettting data')
      } else {
        if (userResult) {
          if (bcrypt.verify(req.body.password, userResult[0].password)) {
            let token = jwt.sign({ user_id: userResult[0].id }, 'sample')
            log.info('User logged in successfully')
            res.status(200).send('user data found ' + token)
          } else {
            log.warn('Invalid Credentials')
            res.status(400).send('invalid credentials')
          }
        } else {
          log.warn('no user data found')
          res.status(200).send('no user data found')
        }
      }
    })
  } catch (e) {
    log.error('Error occured in catch' + e)
    res.status(500).send('Error occured')
  }
})

/**
@param token-string
@returns decoded code or error response.
*/
authrouter.post('/tokenverify', function (req, res) {
  let token = req.body.token
  var decoded = jwt.verify(token, 'sample')
  if (decoded) {
    log.info('token verified ' + JSON.stringify(decoded))
    res.send(decoded)
  } else {
    log.error('Invalid token')

    res.status(400).send('in valid token')
  }
})

authrouter.post('/profile', upload.single('avatar1'), function (
  req,
  res,
  next
) {
  console.log('in the req.file ', req.file)
  res.end()
})

authrouter.get('/upload', function (req, res) {
  res.render('fileupload')
})
module.exports = authrouter
