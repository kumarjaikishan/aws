const { Queue } = require('bullmq');
const IORedis = require('ioredis');

const emailQueue = new Queue('battlefiesta_queue', {
    //for offline redis version
    connection: {
        host: '127.0.0.1',
        port: '6379'
    },

    // for online redis cloud connection
    // connection: new IORedis(process.env.REDIS_URIfulle, {
    //     maxmemoryPolicy: 'noeviction'
    // }),
    defaultJobOptions: {
        delay: 1000,
        removeOnComplete: 500,
        removeOnFail: 1000,
        attempts: 2,
        backoff: {
            type: 'exponential',
            delay: 1000,
        },
    },
});

async function addJobToQueue(email, subject, body) {
    const res = await emailQueue.add(
        'battlefiesta_queue',
        { email, subject, body },
    )
    console.log("Email job added to queue", res.id);
}

async function clearQueue() {
    await emailQueue.clean(0, 'completed'); // Remove all completed jobs
    await emailQueue.clean(0, 'failed');    // Remove all failed jobs
    console.log("All jobs cleared from the queue.");
}
// clearQueue().catch(console.error);


module.exports = { addJobToQueue };
