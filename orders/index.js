const express = require('express')
const app = express()
const port = 4000

const token = "fake-token"

app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // To parse the incoming requests with JSON payloads

const orders = []

app.get('/orders', (req, res) => {

  // communiate with accounts
  // if authenticcated, then return order

  return res.send({
    statusCode: 200,
    err: null,
    data: orders
  })

})

app.post('/orders', (req, res) => {
  const order = req.body
  // communiate with accounts
  // if authenticcated, then return order
  orders.push(order)
  return res.send({
    statusCode: 200,
    err: null,
    data: order
  })
})

app.listen(port, () => {
  console.log(`Order app listening on port ${port}`)
})