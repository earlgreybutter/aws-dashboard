const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const InputColumn = require('./InputColumn');

const SecurityGroupSchema = new Schema(
  {
    Description: String,
    GroupName: String,
    IpPermissions: [
      {
        FromPort: Number,
        IpProtocol: String,
        IpRanges: [
          {
            Description: String,
            CidrIp: String,
          },
        ],
        Ipv6Ranges: [
          {
            CidrIpv6: String,
          },
        ],
        PrefixListIds: Array,
        ToPort: Number,
        UserIdGroupPairs: Array,
      },
    ],
    OwnerId: String,
    GroupId: String,
    IpPermissionsEgress: [
      {
        IpProtocol: String,
        IpRanges: [
          {
            CidrIp: String,
          },
        ],
        Ipv6Ranges: [
          {
            CidrIpv6: String,
          },
        ],
        PrefixListIds: Array,
        UserIdGroupPairs: Array,
      },
    ],
    Tags: [
      {
        Key: String,
        Value: String,
      },
    ],
    VpcId: String,
    InputValue: InputColumn,
  },
  { timestamps: true }
);

const SecurityGroup = mongoose.model('security-group', SecurityGroupSchema);
module.exports = { SecurityGroup };
