require('dotenv').config();
const {S3Client, HeadBucketCommand} = require('@aws-sdk/client-s3');

const params = {
  credentials: {
    accessKeyId: process.env.AWS_PUBLIC_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
  region: 'us-west-1',
};

const s3 = new S3Client(params);

const testS3Connection = async (s3) => {
  const params = {
    Bucket: 'dataflow-development-bucket',
  };

  const command = new HeadBucketCommand(params);
  try {
    await s3.send(command);
    console.log('✅ S3 activated');
  } catch (err) {
    console.log('❌ S3 inactivated', err);
  }
};

module.exports = {s3, testS3Connection};
