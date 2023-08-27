const multer = require('multer');
const multerS3 = require('multer-s3');

const {s3} = require('./s3.config');

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'dataflow-development-bucket',
    metadata: function(req, file, cb) {
      cb(null, {fieldNames: file.fieldname});
    },
    key: function(req, file, cb) {
      cb(null, 'datasets/' + Date.now().toString()); // Simulate S3 folders
    },
  }),
});

module.exports = upload;
