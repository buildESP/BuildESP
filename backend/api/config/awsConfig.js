const AWS = require('aws-sdk');
require('dotenv').config();

const s3 = new AWS.S3({
    accessKeyId: "AKIA4VDBMD2P7ITQDPPJ",
    secretAccessKey: "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",
    region: "eu-west-3",
});

module.exports = s3;
