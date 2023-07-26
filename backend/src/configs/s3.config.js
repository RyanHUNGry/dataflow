const multerS3 = require("multer-s3")
const multer = require('multer')

const AWS = require('aws-sdk')

AWS.config.update({
    accessKeyId: process.env.AWS_PUBLIC_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: 'us-west-1'
  });

const s3 = new AWS.S3()
const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'dataflow-datasets',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {
            cb(null, 'lala' + '.csv')
        }
    })
})

module.exports = upload