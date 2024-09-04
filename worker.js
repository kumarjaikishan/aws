const { Worker } = require('bullmq');
const IORedis = require('ioredis');
const sendmail = require('./sendemail');

const sendEmailhelper = async (n) => {
    return new Promise((res, rej) => setTimeout(() => res(), n * 1000))
}

async function sendEmail(job) {
    const { email, subject, body } = job.data;
    await sendmail(email, subject, body);
    await sendEmailhelper(2);
}

const worker = new Worker('battlefiesta_queue',
    sendEmail,
    // for online redis cloud connection
    // {
    //     connection: new IORedis(process.env.REDIS_URIfulle, {
    //         maxRetriesPerRequest: null,
    //     }),

    //for offline redis version
    {
        connection: {
            host: '127.0.0.1',
            port: '6379'
        }
    });

worker.on('completed', job => {
    console.log(`Job: ${job.id} has completed- Email`);
})

worker.on('failed', (job, err) => {
    console.log(`${job.id} has failed - ${err}`);
})