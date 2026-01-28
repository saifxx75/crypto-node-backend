const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Real-time Crypto Price Tracker backend is running');
});

module.exports = app;