const jobs = require('../store/jobStore');
const sleep = require('../utils/sleep');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

function emitEvent(job, message, iteration, total, data = {}) {
    const progress = Math.floor((iteration / total) * 100);
    job.progress = progress;

    const event = {
        job_id: job.job_id,
        status: job.status,
        progress,
        message,
        timestamp: new Date().toISOString(),
        data,
    };

    job.listeners.forEach((res) => {
        res.write(`data: ${JSON.stringify(event)}\n\n`);
    });
};

const runCryptoJob = async (job_id) => {
    const job = jobs.get(job_id);
    const totalIterations = 24;

    for (let i = 1; i <= totalIterations; i++) {
        if (job.stopFlag) {
            job.status = 'stopped';
            emitEvent(job, 'Job stopped by admin', i, totalIterations);
            return;
        }
        try {
            const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd");
            const data = await response.json();
            emitEvent(
                job,
                `Fetched BTC: $${data.bitcoin.usd}, ETH: $${data.ethereum.usd}`,
                i,
                totalIterations,
                data
            );
        } catch (err) {
            emitEvent(job, `Error fetching data: ${err.message}`, i, totalIterations);
        }
        if (i < totalIterations) {
            await sleep(5000);
        }
    }
    job.status = 'completed';
    emitEvent(job, 'Job completed successfully', totalIterations, totalIterations);
};

module.exports = runCryptoJob;