const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { streamEvents } = require('../controllers/streamController');

router.get('/events', auth, streamEvents);

module.exports = router;