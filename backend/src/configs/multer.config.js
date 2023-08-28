const multer = require('multer');
const multerS3 = require('multer-s3');

const {s3} = require('./s3.config');
const flowsModel = require('../api/models/flows.model');

const checkFlowValidityMiddleware = async (req, res, next) => {
  const uid = req.user;
  const data = {...req.query}
  const {fid} = data
  
  if (!fid) {
    return res.status(400).json({error: 'Please specify an fid'})
  }

  // Check if flow exists and user has ownership of that flow
  const doesUserOwnFlow = (await flowsModel.checkFlowValidity({uid, fid})).length !== 0;
  if (!doesUserOwnFlow) {
    return res.status(400).json({error: 'Invalid flow'});
  }

  const doesFlowHaveDataset = (await flowsModel.getS3BucketKeyByFid({fid}))

  if (doesFlowHaveDataset) {
    return res.status(400).json({error: 'Flow already has a dataset'})
  }
  
  next()
}

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

module.exports = {
  checkFlowValidityMiddleware,
  upload
};
