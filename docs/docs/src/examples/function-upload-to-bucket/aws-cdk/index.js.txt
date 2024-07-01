const AWS = require('aws-sdk');
const S3 = new AWS.S3();

exports.handler = async (event) => {
  const bucketName = process.env.BUCKET_NAME;
  const key = 'hello.txt';
  const content = 'Hello world!';

  const params = {
    Bucket: bucketName,
    Key: key,
    Body: content,
  };

  try {
    await S3.putObject(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify('File uploaded successfully.'),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify('Error uploading the file.'),
    };
  }
};
