import { AWSConfig, SQSClient } from 'https://jslib.k6.io/aws/0.12.3/sqs.js';


// Debugging: Print environment variables
console.log(`AWS_REGION: ${__ENV.AWS_REGION}`);
console.log(`AWS_ACCESS_KEY_ID: ${__ENV.AWS_ACCESS_KEY_ID}`);
console.log(`AWS_SECRET_ACCESS_KEY: ${__ENV.AWS_SECRET_ACCESS_KEY}`);
console.log(`AWS_SESSION_TOKEN: ${__ENV.AWS_SESSION_TOKEN}`);

const awsConfig = new AWSConfig({
    region: __ENV.AWS_REGION,
    accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
    secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,
    sessionToken: __ENV.AWS_SESSION_TOKEN,
});

const sqs = new SQSClient(awsConfig);
const queueUrl = 'https://sqs.ap-southeast-2.amazonaws.com/990522850489/SQSLoadTesterK6';

export default async function () {
    await sqs.sendMessage(queueUrl, 'test message', {
        messageAttributes: {
            'Attribute1': { type: 'String', value: 'Value1' },
            'Attribute2': { type: 'Number', value: '123' },
        },
    });
}