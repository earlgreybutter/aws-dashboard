var mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define Schema
var keypairSchema = new Schema(
  {
    KeyPairId: {
      type: String,
      required: [true, 'KeyPairId field is required'],
    },  // pk 비슷한 것
    KeyFingerprint: String,
    KeyName: String,
    KeyType: String,
    Tags: Array,
    DocState: String   // Y/N 상태값 표시 
  },
  {
    timestamps: true,
  }
);

// compile schema to model
var KeypairModel = mongoose.model(
  "Keypair",
  keypairSchema,
  "keypairCollection"
);

module.exports = { KeypairModel };
