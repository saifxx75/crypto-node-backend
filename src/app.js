const express = require('express');
const app = express();
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const streamRoutes = require('./routes/streamRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/stream', streamRoutes);

app.get('/', (req, res) => {
  res.send('Real-time Crypto Price Tracker backend is running');
});

module.exports = app;