import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const BUCKET = process.env.AWS_S3_BUCKET;

export const s3Upload = (file) => {
  const params = {
    Bucket: BUCKET,
    Key: Date.now() + '-' + file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
  return s3.upload(params).promise();
};

export const s3ListFiles = async () => {
  const params = { Bucket: BUCKET };
  const data = await s3.listObjectsV2(params).promise();
  return data.Contents.map(obj => ({
    key: obj.Key,
    lastModified: obj.LastModified,
    size: obj.Size,
    url: s3.getSignedUrl('getObject', { Bucket: BUCKET, Key: obj.Key, Expires: 3600 })
  }));
};

export const s3Download = (key) => {
  const params = { Bucket: BUCKET, Key: key };
  return s3.getObject(params).createReadStream();
};
