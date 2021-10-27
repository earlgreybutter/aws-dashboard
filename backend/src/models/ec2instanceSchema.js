const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create instance Schema & model
var InstanceSchema = new Schema(
  {
    Region: String,
    VpcId: String,
    Name: String,
    InstanceId: {
      type: String,
      required: [true, 'InstanceId field is required'],
    }, // pk 비슷한 것
    InstanceType: String,
    PrivateIpAddress: String,
    PrivateDnsName: String,
    PublicIpAddress: String,
    PublicDnsName: String,
    SecurityGroup: String,
    InstanceState: String,
    DocState: String, // Y/N 상태값 표시. default 값 Y로 두기, old data는 N으로 바꿔주는 logic 필요
  },
  { timestamps: true }
);

var InstanceModel = mongoose.model(
  'Instance',
  InstanceSchema,
  'instanceCollection'
); // collection name
module.exports = { InstanceModel };
