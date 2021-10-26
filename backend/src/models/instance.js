 const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create instance Schema & model
const InstanceSchema = new Schema(
  {
    instanceId: {
      type: String,
      required: [true, 'InstanceId field is required'],
    },
    keyName: String,
    instanceType: String,
    privateIpAddress: String,
    description: String,
  },
  { timestamps: true }
);

const Instance = mongoose.model('instance', InstanceSchema); // collection name
module.exports = { Instance };
