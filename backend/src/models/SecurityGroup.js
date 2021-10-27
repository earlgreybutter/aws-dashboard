const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SecurityGroupSchema = new Schema(
  {
    IpPermissionsEgress: [
      {
        IpProtocol: Number,
        IpRanges: [
          {
            CidrIp: String,
          },
        ],
        UserIdGroupPairs: Array,
        PrefixListIds: Array,
      },
    ],
    Description: String,
    Tags: [
      {
        Value: String,
        Key: String,
      },
    ],
    IpPermissions: [
      {
        IpProtocol: Number,
        IpRanges: Array,
        UserIdGroupPairs: [
          {
            UserId: String,
            GroupId: String,
          },
        ],
        PrefixListIds: Array,
      },
      {
        PrefixListIds: Array,
        FromPort: Number,
        IpRanges: [
          {
            Description: String,
            CidrIp: String,
          },
        ],
        ToPort: Number,
        IpProtocol: String,
        UserIdGroupPairs: Array,
      },
    ],
    GroupName: String,
    VpcId: String,
    OwnerId: String,
    GroupId: String,
  },
  { timestamps: true }
);

const SecurityGroup = mongoose.model('sg', SecurityGroupSchema);
module.exports = { SecurityGroup };
