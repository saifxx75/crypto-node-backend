const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const {
  startJob,
  stopJob,
  getJobStatus,
} = require('../controllers/jobController');

router.post('/startJob', auth, role("ADMIN"), startJob);
router.post('/stopJob', auth, role("ADMIN"), stopJob);
router.get('/jobStatus', auth, getJobStatus);

module.exports = router;