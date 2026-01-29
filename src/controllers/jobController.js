const jobs = require('../store/jobStore');
const runCryptoJob = require('../services/cryptoJob');

const startJob = (req, res) => {
  const job_id = `job_${Date.now()}`;

  const job = {
    job_id,
    jobType: "crypto_monitor",
    status: "RUNNING",
    progress: 0,
    startTime: new Date(),
    endTime: null,
    createdBy: req.user.email,
    stopFlag: false,
    listeners: [],
  };

  jobs.set(job_id, job);
  runCryptoJob(job_id);

  res.status(201).json({
    success: true,
    job_id,
    status: "RUNNING",
    message: "Job started successfully",
  });
};

const stopJob = (req, res) => {
  const { job_id } = req.body;
  const job = jobs.get(job_id);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  job.stopFlag = true;

  res.json({
    success: true,
    job_id,
    status: "STOPPED",
    message: "Job stopped successfully",
  });
};

const getJobStatus = (req, res) => {
  const { job_id } = req.query;

  if (job_id) {
    const job = jobs.get(job_id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    return res.json(job);
  }

  res.json({
    jobs: Array.from(jobs.values()),
    total: jobs.size,
  });
};

module.exports = {
  startJob,
  stopJob,
  getJobStatus,
};