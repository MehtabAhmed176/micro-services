const express = require('express')
const app = express()
const port = 5000
const axios = require('axios')

app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // To parse the incoming requests with JSON payloads

const products = []

app.post('/products', async (req, res) => {
  const authHeader = req.headers.authorization;
  // communiate with accounts
  // if authenticcated, then return order

  const authenticate = await axios.post('http://localhost:3000/auth',{},
    {
      headers: {
        'authorization': `${authHeader}`
      }
    })
    
  
  if (authenticate.data.statusCode === 200) {
    products.push(req.body)
    return res.send({
      statusCode: 200,
      err: null,
      data: products
    })
  } else {
    return res.send({
      statusCode: 401,
      err: null,
      data: authenticate.data.err
    })
  }
})

app.get('/product/:id', (req, res) => {
  const id = req.params.id
  // communiate with accounts
  // if authenticcated, then return order
  const product = products.filter(x => x.id == id)
  return res.send({
    statusCode: 200,
    err: null,
    data: product
  })
})

app.listen(port, () => {
  console.log(`Products app listening on port ${port}`)
})