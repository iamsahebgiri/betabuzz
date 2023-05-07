const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const config = require('../config/config');

const s3Client = new S3Client({
  region: config.aws.s3.bucketRegion,
  credentials: {
    accessKeyId: config.aws.s3.accessKeyId,
    secretAccessKey: config.aws.s3.secretAccessKey,
  },
});

const uploadFile = async (file) => {
  const { key, buffer, mimetype } = file;
  const params = {
    Bucket: config.aws.s3.bucketName,
    Key: key,
    Body: buffer,
    ContentType: mimetype,
  };

  const data = await s3Client.send(new PutObjectCommand(params));
  return data;
};

const deleteFile = (fileName) => {
  const deleteParams = {
    Bucket: config.aws.s3.bucketName,
    Key: fileName,
  };

  return s3Client.send(new DeleteObjectCommand(deleteParams));
};

module.exports = {
  uploadFile,
  deleteFile,
};
