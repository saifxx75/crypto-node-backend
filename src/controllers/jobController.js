const jobs = require('../store/jobStore');
const runCryptoJob = require('../services/cryptoJob');

const sanitizeJob = (job) => ({
  job_id: job.job_id,
  jobType: job.jobType,
  status: job.status,
  progress: job.progress,
  startTime: job.startTime,
  endTime: job.endTime,
  createdBy: job.createdBy,
});


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
  if (!req.body || !req.body.job_id) {
    return res.status(400).json({ message: "job_id is required" });
  }

  const { job_id } = req.body;
  const job = jobs.get(job_id);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  // Mark job to stop
  job.stopFlag = true;

  // Set endTime immediately when job is stopped
  job.endTime = new Date();

  return res.json({
    success: true,
    job_id,
    status: "STOPPED",
    endTime: job.endTime,
    message: "Job stopped successfully",
  });
};

const getJobStatus = (req, res) => {
  const { job_id } = req.query;

  if (job_id) {
    const job = jobs.get(job_id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    return res.json(sanitizeJob(job));
  }

  const jobList = Array.from(jobs.values()).map(sanitizeJob);

  return res.json({
    jobs: jobList,
    total: jobList.length,
  });
};

module.exports = {
  startJob,
  stopJob,
  getJobStatus,
};