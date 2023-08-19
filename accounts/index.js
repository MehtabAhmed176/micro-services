const express = require('express')
const app = express()
const port = 3000

const fakeToken = "fake-token"

app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // To parse the incoming requests with JSON payloads


app.post('/login', (req, res) => {
  console.log('req', req.body)

  if (req.body.password && req.body.email) {
    return res.status(200).send({
      statusCode: 200,
      err: null,
      token: fakeToken
    })
  }

  return res.status(400).send({
    statusCode: 400,
    err: "email or passwoprd missing",
    token: null
  })

})


app.post('/auth', (req, res) => {

  const authHeader = req.headers.authorization;
  console.log('authHeader', authHeader)
 
  console.log('reached')
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    if (token === fakeToken) {
      return res.send({
        statusCode: 200,
        err: null,
        token: fakeToken
      })
    }
    else {
      return res.send({
        statusCode: 401,
        err: "invalid token",
        token: null
      })
    }

  } else {
    return res.send({
      statusCode: 400,
      err: "Please provide token in Auth",
      token: null
    })
  }

})


app.post('/signup', (req, res) => {
  if (req.body.password && req.body.email) {
    return res.send({
      statusCode: 200,
      err: null,
      token: fakeToken
    })

  }

  return res.send({
    statusCode: 400,
    err: null,
    token: null
  })
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports=app