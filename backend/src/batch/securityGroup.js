'use strict';
const AWS = require('aws-sdk');
const mongoose = require('mongoose');
const { SecurityGroup } = require('../models/SecurityGroup');

const MONGO_URI = 'mongodb://localhost/awsdb';
mongoose.connect(MONGO_URI);

AWS.config.update({ region: 'ap-northeast-2' });
AWS.config.apiVersions = { ec2: '2016-11-15' };

const ec2 = new AWS.EC2();

ec2.describeSecurityGroups(function (err, data) {
  if (err) console.log(err, err.stack);
  else {
    SecurityGroup.insertMany(data)
      .then(data => {
        console.log(data);
        mongoose.disconnect();
      })
      .catch(err => {
        console.log(err);
      });
  }
});
