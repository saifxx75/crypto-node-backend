const jobs = require('../store/jobStore');

const streamEvents = (req, res) => {
  const { job_id } = req.query;
  const job = jobs.get(job_id);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  res.write(
    `data: ${JSON.stringify({
      message: "Connected to job stream",
      job_id,
      timestamp: new Date().toISOString(),
    })}\n\n`
  );

  job.listeners.push(res);

  req.on("close", () => {
    job.listeners = job.listeners.filter((client) => client !== res);
  });
};

module.exports = {
    streamEvents,
};