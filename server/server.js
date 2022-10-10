const express = require('express')

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  req.method === 'OPTIONS' ? res.send('CURRENT SERVICES SUPPORT CROSS DOMAIN REQUESTS!') : next()
})

app.get('/lucky', (req, res) => {
  //生成一个 n-m 之间的整数随机数
  // Math.floor(Math.random() * (m - n + 1) + n)
  let num = Math.floor(Math.random() * (6 + 1))
  res.send({
    code: 100,
    prodCode: num,
  })
})

app.listen(9999, () => {
  console.log('Server is running...')
})
