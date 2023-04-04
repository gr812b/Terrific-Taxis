const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('This is a test of the terrific taxi server')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
