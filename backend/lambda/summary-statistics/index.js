const fs = require('fs')
const csv = require('csv-parser')
const { S3Client, HeadBucketCommand, GetObjectCommand } = require('@aws-sdk/client-s3')

const s3 = new S3Client(); // Lambda handles the authentication since you are already logged in and this is not external to AWS and so you are connected to S3 now!

exports.handler = async (event) => { // For event, each service will pass in their own event object so you just gotta look and figure out what it looks like
  const s3Data = event.Records[0].s3
  const bucketName = s3Data.bucket.name
  const objectKey = s3Data.object.key;

  const params = {
    Bucket: bucketName,
    Key: objectKey
  }

  const command = new GetObjectCommand(params)
  const response = await s3.send(command)

  const csvStream = response.Body.transformToWebStream();

  const results = [];

  // Pipe the CSV stream into the csv-parser and process data
  csvStream.pipe(csv())
    .on('data', (data) => {
      results.push(data);
    })
    .on('end', () => {
      console.log('CSV parsing complete:', results);
    })
    .on('error', (error) => {
      console.error('Error parsing CSV:', error);
    });


  return {
    bucketName,
    objectKey
  }
};
