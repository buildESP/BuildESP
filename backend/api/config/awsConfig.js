const AWS = require('aws-sdk');
require('dotenv').config();

const s3 = new AWS.S3({
    accessKeyId: "AKIAZ4SYUDBYDAQPTHYO",
    secretAccessKey: "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",
    region: "eu-west-2",
});

module.exports = s3;
